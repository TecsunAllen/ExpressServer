var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var fileSystem = require('fs');
//var images = require("images");
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
//var pcScaner = require("../services/pcScaner.js");
var dbHelper = require("../services/dbHelper.js");
var shareManager = require("../services/ShareManager.js");
const collectionName = "Records";
const ImagesDir = "D:/LDS-Images";
const splitStr = "{[_--_]}";
fileSystem.exists(ImagesDir, function (exists) {
    if (!exists)
        fileSystem.mkdir(ImagesDir);
});

/* GET home page. */
router.get('/', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('index', { title: 'Express' });
});

router.get('/GetUrlResultProxy', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var decodeUrl = new Buffer(arg.url, 'base64').toString()
    shareManager.getUrlHttpsProxy(decodeUrl,function(result){
        res.writeHead(200, {'Content-type' : 'text/json;charset=utf-8','Access-Control-Allow-Origin':'*'});
        res.write(result);
        res.end();
    });
});



router.post('/saveRecord', upload.array('photos', 12), function (req, res) {
    var arg = req.body;
    arg.date = (new Date()).getTime();
    arg.images = [];
    for (var i = 0; i < req.files.length; i++) {
        //var filePath = fileSystem.existsSync(req.files[i].path);
        //创建读取流
        var dstFilePath = ImagesDir + '/' +arg.date+ splitStr +req.files[i].originalname;
        var readable = fileSystem.createReadStream(req.files[i].path);
        //创建写入流 
        var writable = fileSystem.createWriteStream(dstFilePath, { encoding: "utf8" });
        // 通过管道来传输流
        readable.pipe(writable);
        arg.images.push(dstFilePath);
    }
    dbHelper.getMongodb().collection(collectionName).insert(arg, function (err) {

    });
    res.json({ title: 'Express' });
    //var test = fileSystem.existsSync(req.files[0].path);
});

/*{
    collectionName:"",//string
}*/
router.get('/dropCollection', function (req, res) {
    var arg = url.parse(req.url, true).query;
    dbHelper.getMongodb().collection(arg.collectionName).drop(function (err, result) {
        if (err) {
            res.json(err);
        }
        else res.json({ success: true });
    });
});

/*{
    collectionName:"",//string
    data:""           //jsonString
}*/
router.get('/insertData', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var position = JSON.parse(arg.data);
    dbHelper.getMongodb().collection(arg.collectionName).insert(position, function (err, result) {
        if (err) {
            res.json(err);
        }
        else res.json({ success: true });
    });
});

/*{
    collectionName:"",//string
    queryInfo:""           //jsonString
}*/
router.get('/getData', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var queryObj = JSON.parse(arg.queryInfo);
    dbHelper.getMongodb().collection(arg.collectionName).find(queryObj).toArray(function (err, result) {
        if (err) {
            res.json(err);
        }
        else res.json(result);
    });
});


function filterFiles(files, folderPath, mode) {
    var newfiles = files.filter(function (file) {
        try {
            var stats = fileSystem.lstatSync(folderPath + "/" + file);
            return mode == "file" ? !stats.isDirectory() : stats.isDirectory();
            //return mode == "file" ? (!stats.isDirectory() && /(.JPG$)|(.PNG$)/.test(file.toUpperCase())) : stats.isDirectory();
        }
        catch (e) {
            return false;
        }
    });
    return newfiles;
}
router.get('/getThumbImage', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var filePath = arg.path;
    var dirPath = path.dirname(filePath);
    var fileName = path.basename(filePath);
    var thumbPath = dirPath + "/thumb/" + fileName;
    if (filePath.indexOf("thumb") != -1) {
        thumbPath = filePath;
    }
    else {
        if (!fileSystem.existsSync(dirPath + "/thumb")) {
            fileSystem.mkdirSync(dirPath + "/thumb");
        }
        if (!fileSystem.existsSync(thumbPath)) {
            images(filePath)     //加载图像文件
                .size(300)          //等比缩放图像到1000像素宽
                .save(thumbPath, {
                    quality: 80     //保存图片到文件,图片质量为50
                });
        }
    }
    var fileStream = fileSystem.createReadStream(thumbPath);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(res);
    fileStream.on("end", function () {
        res.end();
        //fileSystem.unlink(thumbPath);
    })
})

router.get('/getFile', function (req, res) {
    try {
        var arg = url.parse(req.url, true).query;
        var filePath = arg.path;
        var extname = path.extname(filePath);
        if (extname == "") {
            res.json({ success: false, message: "无效路径！" });
            return;
        }
        if (!fileSystem.existsSync(filePath)) {
            res.json({ success: false, message: "文件不存在！" });
            return;
        }
        var stat = fileSystem.statSync(filePath);
        var totalLength = stat.size;
        var particalLength = 1024 * 1024;
        var range = {
            start: 0,
            end: particalLength
        };

        if (req.headers.range) {
            var rangeArray = req.headers.range.split(/bytes=([0-9]*)-([0-9]*)/);
            var start = parseInt(rangeArray[1]);
            var end = parseInt(rangeArray[2]);
            range.start = start;
            if (isNaN(end)) {
                range.end = (totalLength - range.start) > particalLength ? range.start + particalLength - 1 : totalLength - 1;
            }
            else range.end = end;
            res.writeHead(206, {
                "Content-Type": "video/mp4",
                "Content-Length": range.end - range.start + 1,
                "Accept-Ranges": "bytes",
                'Content-Range': 'bytes ' + range.start + '-' + range.end + '/' + totalLength,
                "Cache-Control": "no-cache"
            });
        }
        else res.writeHead(200, {
            "Content-Type": "video/mp4",
            "Content-Length": totalLength,
            "Accept-Ranges": "bytes",
            "Cache-Control": "no-cache"
        });
        var fileStream = fileSystem.createReadStream(filePath, range);
        fileStream.pipe(res);
        fileStream.on("end", function () {
            res.end();
        })
    }
    catch (ex) {
        console.log(ex);
    }
})

router.get('/scanFolder', function (req, res) {
    var arg = url.parse(req.url, true).query;
    try {
        fileSystem.readdir(arg.folderPath + "/", function (err, files) {
            try {
                var newfiles = filterFiles(files, arg.folderPath, "file");
                var newFolders = filterFiles(files, arg.folderPath, "folder");
                res.json({
                    currfolder: arg.folderPath,
                    childfolders: newFolders,
                    files: newfiles
                });
            }
            catch (e) {
                console.log(e);
                res.json(e);
            }
            finally {

            }
        });
    }
    catch (ex) {

    }
});
module.exports = router;
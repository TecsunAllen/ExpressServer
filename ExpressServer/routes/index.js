var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var fileSystem = require('fs');
var images = require("images");
var pcScaner = require("../services/pcScaner.js")
/* GET home page. */
router.get('/', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('index', { title: 'Express' });
});


router.get('/photoAnalysis', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('photoAnalysis', { title: 'Express' });
});

router.get('/oec', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('oec', { title: 'Express' });
});


router.get('/scanPC', function (req, res) {
    pcScaner.startScan();
    res.json({ success: true, message: "开始扫描!" });
});


router.get('/findFile', function (req, res) {
    var arg = url.parse(req.url, true).query;
    pcScaner.findFileByName(arg.fileName, function (err, result) {
        res.json(result);
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
            range.end = isNaN(end)?totalLength-1 : range.start + particalLength -1;
            res.writeHead(206, { 
                "Content-Type": "video/mp4", 
            "Content-Length": range.end-range.start +1,
            "Accept-Ranges":"bytes",
            'Content-Range':'bytes ' + range.start + '-' +  range.end + '/' + totalLength,
            "Cache-Control":"no-cache"
        });
        }
        else res.writeHead(200, { "Content-Type": "video/mp4", 
        "Content-Length": totalLength,
        "Accept-Ranges":"bytes",
        "Cache-Control":"no-cache"});
        var fileStream = fileSystem.createReadStream(filePath,range);
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
var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var dbService = require('../services/mysql.js');
var fileSystem = require('fs');
var images = require("images");
/* GET home page. */
router.get('/', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('index', { title: 'Express' });
});


router.get('/photoAnalysis', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('photoAnalysis', { title: 'Express' });
});

function filterFiles(files, folderPath, mode) {
    var newfiles = files.filter(function (file) {
        try {
            var stats = fileSystem.lstatSync(folderPath + "/" + file);
            return mode == "file" ? (!stats.isDirectory() && /(.JPG$)|(.PNG$)/.test(file.toUpperCase())) : stats.isDirectory();
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
                .size(1000)          //等比缩放图像到1000像素宽
                .save(thumbPath, {
                    quality: 80     //保存图片到文件,图片质量为50
                });
        }
    }
    var fileStream = fileSystem.createReadStream(thumbPath);
    res.writeHead(200, {"Content-Type": "image/jpg"});
    fileStream.pipe(res);
    fileStream.on("end", function () {
        res.end();
    })
})


router.get('/getFile', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var filePath = arg.path;
    var fileStream = fileSystem.createReadStream(filePath);
    res.writeHead(200, {"Content-Type": "application/octet-stream"});
    fileStream.pipe(res);
    fileStream.on("end", function () {
        res.end();
    })
})
router.get('/scanFolder', function (req, res) {
    var arg = url.parse(req.url, true).query;
    fileSystem.readdir(arg.folderPath, function (err, files) {
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
});
module.exports = router;
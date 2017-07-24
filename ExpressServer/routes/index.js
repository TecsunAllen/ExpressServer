var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var dbService = require('../services/mysql.js');
var fileSystem = require('fs');
var images = require("images");
dbService.connectMysql();
/* GET home page. */
router.get('/', function (req, res) {
    var arg = url.parse(req.url, true).query;
    dbService.connectMysql();
    //dbService.excuteSql();
    res.render('index', { title: 'Express' });
});


router.post('/SaveLocationInfo', function (req, res) {
    try{
        var location =JSON.parse(req.body.jsonData);
        var dateStr = new Date().Format('yyyy-MM-dd hh:mm:ss');
        var values = "'" + guid() + "','" + location.ip + "','" + location.city + "','"
                    + location.cityCode + "','" + location.district + "','" + location.poiName + "','"
                    + location.province + "','" + location.street + "','" + location.streetNum + "','"
                    + location.latitude + "','" + location.longitude + "','" + dateStr + "'";
        var sql = "INSERT INTO locationHistory VALUES(" + values + "); ";
        dbService.excuteSql(sql);
        res.json(req.body);
    }
    catch(e){

    }
});



router.get('/webgl', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('webgl', { title: 'Express' });
});


function filterFiles(files, folderPath, mode) {
    var newfiles = files.filter(function (file) {
        try {
            var stats = fileSystem.lstatSync(folderPath + "/" + file);
            return mode == "file" ? (!stats.isDirectory() && /(.JPG$)|(.PNG$)/.test(file)) : stats.isDirectory();
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
router.get('/scanFolder', function (req, res) {
    var arg = url.parse(req.url, true).query;
    fileSystem.readdir(arg.folderPath, function (err, files) {
        try {
            var newfiles = filterFiles(files, arg.folderPath, "file");
            var newFolders = filterFiles(files, arg.folderPath, "folder");
            res.json({
                baseFolder: arg.folderPath,
                files: newfiles,
                folders: newFolders
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


router.get('/getLocationInfo', function (req, res) {
    try{
        dbService.connectMysql();
        var dateStr = new Date().Format('yyyy-MM-dd');
        var sql = "SELECT * FROM locationhistory WHERE date < '2017-04-30 23:59:59' AND date > '2017-04-30 00:00:00'";
        var result = dbService.excuteSql(sql,function (err, rows) {
            dbService.closeMysql();
            res.json(rows);
        });

    }
    catch(e){

    }
});


function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}

module.exports = router;
var express = require('express');
var router = express.Router();
var url = require('url');
var dbService = require('../services/mysql.js');
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

router.get('/getFolders', function (req, res) {
    var arg = url.parse(req.url, true).query;
    res.render('webgl', { title: 'Express' });
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
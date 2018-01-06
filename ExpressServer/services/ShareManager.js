var https = require('https');
var cheerio = require('cheerio');
var iconv = require("iconv-lite");

function getUrlHttpsProxy(url,callback) {
    https.get(url, function (res) {
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        res.on("end", function () {
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, "utf8");
            if(callback)callback(result);
        });
    }).on('error', function (e) {
        console.error(e);
    });
}

function getShareInfo(code) {
    var shareInfo = {};
    https.get("https://gupiao.baidu.com/api/stocks/stockdaybar?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=sz002155&step=3&start=&count=200&fq_type=no&timestamp=" + (new Date).getTime(), function (res) {
        var datas = [];
        var size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
        });
        res.on("end", function () {
            var buff = Buffer.concat(datas, size);
            var result = iconv.decode(buff, "utf8");//转码
            var $ = cheerio.load(result);
            var mainDiv = $("#app-wrap .stock-info");
            shareInfo.price = mainDiv.find(".price ._close").html();
            shareInfo.priceCompareLastDay = mainDiv.find(".price span").eq(0).html();
            shareInfo.percentCompareLastDay = mainDiv.find(".price span").eq(1).html();
            mainDiv.find(".bets-content dl").map(function (index, element) {
                console.log($(element).html())
            });
            shareInfo.detailContent = mainDiv.find(".bets-content dl");

            //var result = buff.toString();//不需要转编码,直接tostring  
        });
    }).on('error', function (e) {
        console.error(e);
    });
}


module.exports = {
    getShareInfo: getShareInfo,
    getUrlHttpsProxy:getUrlHttpsProxy
};
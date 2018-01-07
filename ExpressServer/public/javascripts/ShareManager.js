import $ from 'jquery';
async function getHistoryWaveByCode(code) {
    var data = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/stocks/stockdaybar"
            + "?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code=" + code + "&step=3&start=&count=200&fq_type=no&timestamp="
            + (new Date()).getTime());
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            resolve(ev.response);
        };
        xhr.onerror =function(ev){
            reject(ev)
        };
        xhr.send();
    });
    return data;
}



async function getTodayWaveByCode(code) {
    var data = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/stocks/stocktimeline"
        +"?from=h5&os_ver=0&cuid=xxx&vv=2.2&format=json&stock_code=" + code);
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            resolve(JSON.parse(ev.target.response));
        };
        xhr.send();
    });
    return data;
}




async function getSharePageInfoByCode(code) {
    var html = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/stock/"+ code+".html");
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            resolve(ev.target.response);
        };
        xhr.send();
    });
    var page = $(html.replace(/<img/g,"<div").replace(/<script/g,"<div").replace(/<link/g,"<div"));
    var detail = page.find(".stock-info");
    return {
        price:detail.find(".price *:eq(0)").html(),
        priceCL:detail.find(".price *:eq(1)").html(),
        percentCL:detail.find(".price *:eq(2)").html(),
        totalWorth:detail.find("dd:eq(5)").html()
    };
}


async function getShareInfo(code) {
    var data = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/search/stockquery?"
        +"from=pc&os_ver=1&cuid=xxx&vv=3.2&format=json&query_content="+code+"&asset=0%2C4%2C14&timestamp="+(new Date()).getTime());
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            resolve(JSON.parse(ev.target.response).data.stock_data);
        };
        xhr.send();
    });
    return data;
}



async function getSharesInfoBatchByCode(codesArray) {
    var codesString = codesArray.toString();
    var json = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/rails/stockbasicbatch?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="+codesString+"&timestamp="+(new Date()).getTime());
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            resolve(JSON.parse(ev.target.response).data);
        };
        xhr.send();
    });
    return json;

    /*return {
        price:detail.find(".price *:eq(0)").html(),
        priceCL:detail.find(".price *:eq(1)").html(),
        percentCL:detail.find(".price *:eq(2)").html()
    };*/
}


export default {
    getHistoryWaveByCode: getHistoryWaveByCode,
    getTodayWaveByCode: getTodayWaveByCode,
    getShareInfo:getShareInfo,
    getSharePageInfoByCode:getSharePageInfoByCode,
    getSharesInfoBatchByCode:getSharesInfoBatchByCode
};
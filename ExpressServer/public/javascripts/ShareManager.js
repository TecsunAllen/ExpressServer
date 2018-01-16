import $ from 'jquery';
async function getHistoryWaveByCode(code) {
    var data = await new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/stocks/stockdaybar"
            + "?from=pc&os_ver=1&cuid=xxx&vv=100&format=json"
            +"&stock_code=" + code + "&step=3&start=&count=200&fq_type=no&timestamp="
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
        +"?from=pc&os_ver=1&cuid=xxx&vv=100&format=json"
        +"&stock_code="+code+"&timestamp="+(new Date()).getTime());
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


async function getFundInfoByCodes(codeArr){
    var infos=[];
    for(var i=0;i<codeArr.length;i++){
       let info = await getFundInfoByCode(codeArr[i]);
       infos.push(info);
    }
    return infos;
}

async function getFundInfoByCode(code){
    var json = await new Promise(function (resolve, reject) {
        //console.log("开始发送："+"https://gupiao.baidu.com/api/rails/stockbasicbatch?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="+codesString+"&timestamp="+(new Date()).getTime());
        var xhr = new XMLHttpRequest();
        var url = btoa("http://fund.eastmoney.com/"+code+".html");
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            var html = $(ev.target.response);
            var curPercent =html.find("#gz_gszzl").text();
            var fundName = html.find(".funCur-FundName").text();
            //console.log("请求成功"+ev.target.response);
            resolve({
                stockName:fundName,
                stockCode:code,
                percentCL:curPercent.replace("%",""),
                close:0
            });
        };
        xhr.onerror=function(ev){
            console.log(ev);
        };
        xhr.send();
    });
    return json;
}

async function getSharesInfoBatchByCode(codesArray) {
    
    var codesString = codesArray.toString();
    var json = await new Promise(function (resolve, reject) {
        //console.log("开始发送："+"https://gupiao.baidu.com/api/rails/stockbasicbatch?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="+codesString+"&timestamp="+(new Date()).getTime());
        var xhr = new XMLHttpRequest();
        var url = btoa("https://gupiao.baidu.com/api/rails/stockbasicbatch?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="+codesString+"&timestamp="+(new Date()).getTime());
        xhr.open("GET", "/GetUrlResultProxy?url=" + url, true);
        xhr.onload = function (ev) {
            //console.log("请求成功"+ev.target.response);
            resolve(JSON.parse(ev.target.response).data);
        };
        xhr.onerror=function(ev){
            console.log(ev);
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
    getSharesInfoBatchByCode:getSharesInfoBatchByCode,
    getFundInfoByCode:getFundInfoByCode,
    getFundInfoByCodes:getFundInfoByCodes
};
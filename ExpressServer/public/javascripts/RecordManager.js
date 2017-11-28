/*
record
{
    fileList:[],
    text:""
}
*/
var userId;
var userName;
function setUserId(val) {
    userId = val;
}
function setUserName(val) {
    userName = val;
}

async function saveRecordAsync(record) {
    debugger
    var formData = new FormData();
    formData.append("text", record.text);
    formData.append("userId", userId);
    formData.append("userName", userName);
    var response =(await (new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append("text", record.text);
        formData.append("userId", userId);
        formData.append("userName", userName);
        for (var i = 0; i < record.files.length; i++) {
            formData.append('file[]', record.files[i]);
        }
        /*fetch("/saveRecord", {
            method: 'post',
            body: formData
        });*/

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/saveRecord", true);
        xhr.onload = function (data) {
            resolve(data);
        };
        xhr.send(formData);
    })));


    /*var response = (await fetch("/saveRecord", {
        method: 'post',
        body: formData
    }));*/
    let data = response.target.response;
    return data;
}


function saveRecord(record) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.append("text", record.text);
        formData.append("userId", userId);
        formData.append("userName", userName);
        for (var i = 0; i < record.files.length; i++) {
            formData.append('file[]', record.files[i]);
        }
        fetch("/saveRecord", {
            method: 'post',
            body: formData
        });

        /*var xhr = new XMLHttpRequest();
        xhr.open("POST", "/saveRecord", true);
        xhr.onload = function (data) {
            resolve(data);
        };
        xhr.send(formData);*/
    });
}

export default {
    saveRecordAsync: saveRecordAsync,
    saveRecord: saveRecord,
    setUserId: setUserId,
    setUserName: setUserName
};
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

async function getRecords(){
    var response =(await (new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var data = JSON.stringify({
        });
        xhr.open('GET','/getData?collectionName=Records&queryInfo='+data,true);
        xhr.onload=function(ev){
          resolve(ev.currentTarget.response);
        };
        xhr.send();
    })));
    let data = JSON.parse(response);
    return data;
}

async function saveRecordAsync(record) {
    var formData = new FormData(record.form);
    //formData.append("text", record.text);
    //formData.append('file',$(record.form).find("input")[0].files[0]);
    formData.append("userId", userId);
    formData.append("userName", userName);
    var _promise = new Promise(function (resolve, reject) {
        //formData.append('file', record.files[0]);
        /*for (var i = 0; i < record.files.length; i++) {
            formData.append('file['+ i +']', record.files[i]);
        }*/
        /*fetch("/saveRecord", {
            method: 'post',
            body: formData
        });*/

        /*$.ajax({
            url: '/saveRecord',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success:function(data){
                resolve(data);
            }
        });*/

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/saveRecord", true);
        xhr.onload = function (data) {
            resolve(data);
        };
        xhr.send(formData);
    });

    var response =(await _promise);

    /*var response = (await fetch("/saveRecord", {
        method: 'post',
        body: formData
    }));*/
    let data = JSON.parse(response.target.response);
    return data;
}


async function setMark(type){
    let response =  await new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        var data = JSON.stringify({
          type:type,
          date:(new Date()).getTime()
        });
        xhr.open('GET','/insertData?collectionName=mark&data='+data,true);
        xhr.onload=function(response){
          resolve(response);
        };
        xhr.send();
    });
    console.log(response);
}


async function getMarks(){
    let response =  await new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        var data = JSON.stringify({
        });
        xhr.open('GET','/getData?collectionName=mark&queryInfo='+data,true);
        xhr.onload=function(ev){
          resolve(ev.currentTarget.response);
        };
        xhr.send();
    });
    return JSON.parse(response);
}

export default {
    saveRecordAsync: saveRecordAsync,
    getMarks:getMarks,
    setMark:setMark,
    setUserId: setUserId,
    setUserName: setUserName,
    getRecords:getRecords
};

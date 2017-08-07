/**
 * Created by admin on 2017/7/30.
 */
var EXIF = require('./lib/exif.js');
var initFolder = "E:/Images";
var scanFolderUrl = "/scanFolder?folderPath=";
var getThumbUrl = "/getThumbImage?path=";
var getSrcImageUrl = "/getFile?path=";
var mainComponent;
var currentState = {
    currentImage: null,
    currfolder: "",
    childfolders: [],
    files: []
}

function loadImage(srcUrl, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", srcUrl, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
    xhr.onload = function (ev) {
        console.time("处理数据");
        callback(ev.target.response);
        console.timeEnd("处理数据");
    }
}


function arrayBufferToBase64(bufferData) {
    var binary = '';
    var bytes = new Uint8Array(bufferData);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}


function arraybuffer2JpgBase64(bufferData) {
    return "data:image/jpeg;base64," + arrayBufferToBase64(bufferData);
}

function arraybuffer2Blob(bufferData) {
    return new Blob([bufferData], ["image/jpeg"]);
}

function getImageByArraybuffer(bufferData, callback) {
    // var canvas = mainComponent.refs.srcImageCanvas;
    var blob = arraybuffer2Blob(bufferData);
    var img = new Image();
    img.src = URL.createObjectURL(blob);
    img.onload = function (ev) {
        if (callback)callback(img, ev);
    }
    return img;
}

function getImageByArraybufferAsync(bufferData) {
    // var canvas = mainComponent.refs.srcImageCanvas;
    var base64data = arraybuffer2JpgBase64(bufferData);
    var img = new Image();
    img.src = base64data;
    return img;
}
function drawImage(img) {
    if (!img)return;
    var canvas = mainComponent.refs.srcImageCanvas;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.width * img.height / img.width);
}

function getEXIFInfo(bufferData) {
    return EXIF.getDataByBuffer(bufferData);
}

function eventHander(component, type, ev) {
    switch (type) {
        case "goback":
            var currentFolder = component.state.currfolder;
            var parentFolder = currentFolder.replace(/[\\\/]*([^\\\/]*[\\\/]*$)/g, "");
            gotoFolder(parentFolder);
            break;
        case "forwrad":
            break;
        case "gotoFolder":
            var path = component.state.currfolder + "/" + ev.target.text;
            gotoFolder(path);
            break;
        case "thumbClick":
            var url = ev.target.src;
            var path = (new URL(ev.target.src)).searchParams.get("path");
            var srcUrl = currentState.currImagewSrc = getSrcImageUrl + path;
            mainComponent.setState({isLoading: true});
            loadImage(srcUrl, function (bufferData) {
                var base64 = arraybuffer2JpgBase64(bufferData);
                var image = getImageByArraybuffer(bufferData, function (img) {
                    console.time("绘制数据");
                    drawImage(img);
                    console.timeEnd("绘制数据");
                });
                currentState.currentImage = image;
                mainComponent.setState({isLoading: false});
            });
            break;
    }
}

function gotoFolder(path) {
    $.get(scanFolderUrl + path, function (data) {
        data.childfolders = data.childfolders.filter(function (item) {
            return !/thumb/.test(item);
        })
        currentState = data;
        refresh();
    });
}

function initLoad(_mainComponent) {
    mainComponent = _mainComponent;
    gotoFolder(initFolder);
}
function refresh() {
    var files = currentState.files;
    var thumbUrlList = files.map(function (item) {
        return getThumbUrl + currentState.currfolder + "/" + item;
    })
    mainComponent.setState({currentImage: currentState.currentImage});
    mainComponent.refs.addressTool.setState(currentState);
    mainComponent.refs.thumbList.setState({thumbUrlList: thumbUrlList});
    drawImage(currentState.currentImage);
}

window.onresize = function () {
    refresh();
}

module.exports = {
    initLoad: initLoad,
    eventHander: eventHander
};
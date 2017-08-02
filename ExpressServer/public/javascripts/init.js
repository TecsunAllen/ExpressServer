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
    currfolder: "",
    childfolders: [],
    files: []
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
            var srcUrl = getSrcImageUrl + path;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", srcUrl, true);
            xhr.responseType = "blob";
            xhr.send();
            xhr.onload = function (ev) {
                var data = ev.target.response;
                var canvas = mainComponent.refs.srcImageCanvas;
                var ctx = canvas.getContext("2d");
                var img = new Image()
                img.src = URL.createObjectURL(data);
                img.onload = function () {
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.width * img.height / img.width);

                    EXIF.getData(img, function () {
                        var _dataTxt = EXIF.pretty(this);
                        console.log(_dataTxt)
                        //var _dataJson = EXIF.getAllTags(this);
                        //var _orientation = EXIF.getTag(this, 'Orientation');
                    });
                }

            }
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
    mainComponent.updateCanvas();
    mainComponent.refs.addressTool.setState(currentState);
    mainComponent.refs.thumbList.setState({thumbUrlList: thumbUrlList});
}

window.onresize = function () {
    refresh();
}

module.exports = {
    initLoad: initLoad,
    eventHander: eventHander
};
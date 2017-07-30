/**
 * Created by admin on 2017/7/30.
 */
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
    debugger
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
    mainComponent.refs.addressTool.setState(currentState);
    mainComponent.refs.thumbList.setState({thumbUrlList: thumbUrlList});
}

module.exports = {
    initLoad: initLoad,
    eventHander: eventHander
};
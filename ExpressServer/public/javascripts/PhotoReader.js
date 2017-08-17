var EXIF = require('./lib/exif.js');
var oFile = new FileReader();
oFile.onloadend = function (ev) {
    
};
oFile.onprogress = function (ev) {
    var percent = ev.loaded / ev.total;
};
var readFile = function(file){
    oFile.readAsDataURL(file);
    EXIF.getData(file, function () {
        var _dataTxt = EXIF.pretty(this);
        var _dataJson = EXIF.getAllTags(this);
        var _orientation = EXIF.getTag(this, 'Orientation');
    });
}


var progressInterplationData = (function () {
    var actions = {};
    function progressInterplationData(imageData, action) {
        console.time("处理" + action.type);
        switch (action.type) {
            case "invert":
                invertImage(imageData);
                break;
            case "singleWay":
                singleWay(imageData, action.way);
                break;
            case "histogram":
                break;
        }
        console.timeEnd("处理" + action.type);
    }
    function getHistogram() {
        var width = imageData.width;
        var height = imageData.height;
        var pixelData = imageData.data;
        var histogramData = [];
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var startIndex = (i * width + j) * 4;
                pixelData[startIndex];
                pixelData[startIndex + 1];
                pixelData[startIndex + 2];
                pixelData[startIndex + 3];
            }
        }
    }
    function singleWay(imageData, way) {
        var width = imageData.width;
        var height = imageData.height;
        var pixelData = imageData.data;
        var wayIndex;
        switch (way) {
            case "R":
                wayIndex = 0;
                break;
            case "G":
                wayIndex = 1;
                break;
            case "B":
                wayIndex = 2;
                break;
        }
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var startIndex = (i * width + j) * 4;
                var rgba = [
                    pixelData[startIndex],
                    pixelData[startIndex + 1],
                    pixelData[startIndex + 2],
                    pixelData[startIndex + 3]
                ]
                for (var k = 0; k < 3; k++) {
                    pixelData[startIndex + k] = (k == wayIndex ? rgba[wayIndex] : 0);
                }
            }
        }
    }
    function invertImage(imageData) {
        var width = imageData.width;
        var height = imageData.height;
        var pixelData = imageData.data;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var startIndex = (i * width + j) * 4;
                pixelData[startIndex] = 255 - pixelData[startIndex],
                    pixelData[startIndex + 1] = 255 - pixelData[startIndex + 1],
                    pixelData[startIndex + 2] = 255 - pixelData[startIndex + 2],
                    pixelData[startIndex + 3] = 255 - pixelData[startIndex + 3]
            }
        }
    }
    return progressInterplationData;
})();

module.exports = readFile;
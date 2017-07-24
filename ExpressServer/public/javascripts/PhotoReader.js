var React = require('react');
var EXIF = require('./lib/exif.min.js');
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

module.exports = readFile;
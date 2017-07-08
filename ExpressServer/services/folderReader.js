var fs = require("fs");
var path = require("path");
var folderPath = "D:/UIH";
var _isReading = false;
folderReader(folderPath);
function folderReader(folderPath) {
    _isReading = true;
    var fileInfos = [];
    readFolder(folderPath);
    function readFolder(folderPath) {
        var _this = arguments.callee;
        fs.readdir(folderPath, function (err, files) {
            for (var i = 0; i < files.length; i++) {
                var filePath = path.join(folderPath, files[i]);
                var stat = fs.lstatSync(filePath);
                if (stat.isDirectory()) {
                    _this(filePath);
                }
                else {
                    fileInfos.push(filePath);
                }
            }
        });
    }
    return fileInfos;
}
function isReading() {
    return _isReading;
}
module.exports = {
    readFolder: folderReader,
    isReading: isReading
}


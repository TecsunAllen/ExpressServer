var fileSystem = require('fs');
var dbHelper = require("../services/dbHelper.js");
var path = require('path');

var folderData = {};

var scanCount = 0;

function findFileByName(name,callback) {
    dbHelper.query({ name:  {$regex:new RegExp(name,"i")}},callback);
}

function filterFiles(files, folderPath, mode) {
    var newfiles = files.filter(function (file) {
        try {
            var stats = fileSystem.lstatSync(folderPath + "/" + file);
            return mode == "file" ? !stats.isDirectory() : stats.isDirectory();
        }
        catch (e) {
            return false;
        }
    });
    return newfiles;
}

function readFolder(folder, callback) {
    scanCount++;
    fileSystem.readdir(folder.Path, function (err, files) {
        if (!files) return;
        var folders = filterFiles(files, folder.Path, "folder");
        var files = folder.Files = filterFiles(files, folder.Path, "file");
        folder.Folders = folders.map(function (element) {
            return {
                Path: path.join(folder.Path, element)
            }
        });
        folder.Folders.forEach(function (element) {
            readFolder(element, callback)
        })

        var insertArr = [];

        for (var i = 0; i < folder.Folders.length; i++) {
            insertArr.push({ name: folders[i], path: folder.Folders[i].Path, type: 0 });
        }
        for (var i = 0; i < folder.Files.length; i++) {
            insertArr.push({ name: files[i], path: path.join(folder.Path, files[i]), type: 1 });
        }
        if (insertArr.length > 0) dbHelper.insert(insertArr);
        if (callback) callback();
    });
}

var allFiles = [];
function startScan() {
    dbHelper.dropdb(function(err,data){
        scanCount = 0;
        readFolder({ Path:"C:/"}, function () {});
        readFolder({ Path:"D:/"}, function () {});
        readFolder({ Path:"E:/"}, function () {});
    });
}
var pcScaner = {
    startScan: startScan,
    findFileByName:findFileByName
}

module.exports = pcScaner;
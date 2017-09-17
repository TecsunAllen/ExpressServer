var fileSystem = require('fs');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var folderData = {};
var dataPath = "D:/database.json";
var DB_CONN_STR = 'mongodb://localhost:27017/PCResourceManager';
var Mongodb;
var MongoCollection;


MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (!err) {
        Mongodb = db;
        MongoCollection = db.collection('PCFolders');
    }
    else {
        console.log(err);
    }
});

function insertData(data, callback) {
    MongoCollection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (callback) callback(result);
    });
}


function findFileByName(name,callback) {
    MongoCollection.find({ Path:  {$regex:new RegExp(name,"i")}}).toArray(function (err, result) {
        if(callback)callback(err, result);
    });
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
    var dbFolderData = MongoCollection.find({ Path: folder.Path }).toArray(function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (result.length > 0) return;
        console.log("开始读取" + folder.Path);
        fileSystem.readdir(folder.Path, function (err, files) {
            if (!files) return;
            var folders = filterFiles(files, folder.Path, "folder");
            folder.Files = filterFiles(files, folder.Path, "file");
            folder.Folders = folders.map(function (element) {
                return {
                    Path: path.join(folder.Path, element)
                }
            });
            folder.Folders.forEach(function (element) {
                readFolder(element, callback)
            })

            for (var i = 0; i < folder.Folders.length; i++) {
                insertData({Path:folder.Folders[i],type:0});
            }
            for (var i = 0; i < folder.Files.length; i++) {
                insertData({Path:path.join(folder.Path,folder.Files[i]),type:1});
            }
            if (callback) callback();
        });
    });

}

var allFiles = [];
function startScan() {
    fileSystem.readFile(dataPath, "utf8", function (err, data) {
        try {
            if (!data) data = {
                Disks: {
                    D: {
                        Path: "D:/"
                    }
                }
            }
            else data = JSON.parse(data);
            readFolder(data.Disks.D, function () {
            })
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
var pcScaner = {
    startScan: startScan,
    findFileByName:findFileByName
}

module.exports = pcScaner;
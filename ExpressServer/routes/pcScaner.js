var fileSystem = require('fs');
var path = require('path');
var folderData={};
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

function readFolder(folder,callback){
    fileSystem.readdir(folder.Path, function (err, files) {
        if(!files)return;
        folder.Files = filterFiles(files, folder.Path, "file");
        var folders = filterFiles(files, folder.Path, "folder");
        folders = folders.map(function(element) {
            return {
                Path:path.join(folder.Path,element)
            }
        });
        folder.Folders = folders;
        folder.Folders.forEach(function(element){
            readFolder(element,callback)
        })
        if(callback)callback();
    });
}


function writeFile(str){
    
}

var allFiles = [];
function startScan() {
    fileSystem.readFile(__dirname + '/../database.json', "utf8", function (err, data) {
        try {
            data = JSON.parse(data);
            readFolder(data.Disks.C,function(){
                fileSystem.writeFileSync(__dirname + '/../database.json', JSON.stringify(data));
            })
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
var pcScaner = {
    startScan: startScan
}

module.exports = pcScaner;
var appConfig = require("../services/configHelper.js");
var DB_CONN_STR = 'mongodb://'+ appConfig.databaseHost+':'+ appConfig.databasePort+'/'+appConfig.databaseName;
var Mongodb;
var MongoCollection;
var MongoClient = require('mongodb').MongoClient;

var runDBCommand = "\"C:\\Program Files\\MongoDB\\Server\\3.4\\bin\\mongod.exe\" --dbpath D:\\mongodb\\database\\PCManager";

var exec = require('child_process').exec;
var child = exec(runDBCommand,{
    encoding: "utf8"
  },
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

setTimeout(function(){
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (!err) {
            Mongodb = db;
            MongoCollection = db.collection('PCFiless');
        }
        else {
            console.log(err);
        }
    });
},5000);

function insertData(data, callback) {
    MongoCollection.insert(data, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (callback) callback(result);
    });
}


function insertManyData(dataArr, callback) {
    MongoCollection.insertMany(dataArr, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (callback) callback(result);
    });
}

function queryData(queryObj, callback) {
    MongoCollection.find(queryObj).toArray(function (err, result) {
        if(callback)callback(err, result);
    });
}

function dropdb(callback){
    Mongodb.dropDatabase(callback);
}

module.exports = {
    Mongodb:Mongodb,
    MongoCollection:MongoCollection,
    dropdb:dropdb,
    insert:insertData,
    insertMany:insertManyData,
    query:queryData
}

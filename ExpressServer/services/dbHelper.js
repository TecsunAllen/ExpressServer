var appConfig = require("../services/configHelper.js");
var DB_CONN_STR = 'mongodb://' + appConfig.mongodb.databaseHost + ':' + appConfig.mongodb.databasePort + '/' + appConfig.mongodb.databaseName;
var Mongodb;
var MongoCollection;
var positionCollection;
var MongoClient = require('mongodb').MongoClient;

var runDBCommand = __dirname + "/../start.bat";

var exec = require('child_process').exec;

MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (!err) {
        Mongodb = db;
        MongoCollection = db.collection('PCFiless');
        positionCollection = db.collection('position');
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
        if (callback) callback(err, result);
    });
}

function dropdb(callback) {
    Mongodb.dropDatabase(callback);
}

function getMongodb(){
    return Mongodb;
}

module.exports = {
    getMongodb: getMongodb,
    dropdb: dropdb,
    insert: insertData,
    insertMany: insertManyData,
    query: queryData
}

/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host: appConfig.mysql.databaseHost,
    user: appConfig.mysql.userName,
    password: appConfig.mysql.password,
    database: appConfig.mysql.databaseName
});

connection.connect();

connection.query('SELECT * from position', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});*/

















var dbService = (function () {
    var mysql = require('mysql');
    var connection;
    function connectMysql() { 
        connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '111111',
            database: 'reactgps'
        });
        connection.connect(function(data){
            var a =1;

        });
        return connection;
    }
    
    
    function closeMysql() { 
        connection.end();
    }

    function excuteSql(sql,callback) {
        return connection.query(sql, callback);
    }

    return {
        connectMysql: connectMysql,
        closeMysql: closeMysql,
        excuteSql: excuteSql
    }
}());
module.exports = dbService;
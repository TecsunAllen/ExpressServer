var fs=require('fs');
var path = require('path');
var file=path.join(__dirname ,"../AppConfig.json");
var result=JSON.parse(fs.readFileSync(file));

module.exports = result;
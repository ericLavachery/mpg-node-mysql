// connect to mysql
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "zen8070$mysql",
    database: "mpg"
});
module.exports.con = con;

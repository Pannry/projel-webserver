var mysql = require('mysql');

module.exports = function(){
    return getConexaoComObanco;
}

function getConexaoComObanco(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projel"
    });
}

var mysql = require('mysql');

module.exports = function(){
    return criarConexaoComObanco;
}

function criarConexaoComObanco(){
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "projel"
    });
}

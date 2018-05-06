const mysql = require('mysql');

function getConexaoComObanco() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projel',
  });
}

module.exports = () => getConexaoComObanco;

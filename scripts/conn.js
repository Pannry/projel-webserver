const mysql = require('mysql');

function getConexaoComObanco() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
}

module.exports = () => getConexaoComObanco;

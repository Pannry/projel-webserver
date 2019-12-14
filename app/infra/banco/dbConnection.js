const mysql = require('mysql2/promise');

function getConexaoComObanco() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
}

module.exports = () => getConexaoComObanco;

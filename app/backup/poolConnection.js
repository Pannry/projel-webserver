const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'projel',
});

console.log('pool => criado');

pool.on('release', () => {
  console.log('pool => conexao retornada');
});

process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) return console.log(err);
    console.log('pool => fechado');
    return process.exit(0);
  });
});

module.exports = pool;

const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function InstituicaoDAO() { }

module.exports = InstituicaoDAO;

InstituicaoDAO.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

InstituicaoDAO.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

InstituicaoDAO.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  console.log(this.conn.format(sql, input) + '\n');
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

InstituicaoDAO.prototype.listar = async function (input) {
  return this.execSQL('SELECT * FROM instituicao', input);
};

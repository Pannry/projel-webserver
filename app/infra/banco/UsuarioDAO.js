const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function UsuarioDAO() { }

module.exports = UsuarioDAO;

UsuarioDAO.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

UsuarioDAO.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

UsuarioDAO.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

UsuarioDAO.prototype.findIdAluno = async function (input) {
  return this.execSQL('SELECT id, nome, email FROM aluno WHERE ?', input);
};

UsuarioDAO.prototype.findIdProfessor = async function (input) {
  return this.execSQL('SELECT id, nome, email FROM professor WHERE ?', input);
};

UsuarioDAO.prototype.findProfessor = async function (input) {
  return this.execSQL('SELECT * FROM professor WHERE ?', input);
};

UsuarioDAO.prototype.saveProfessor = async function (input) {
  return this.execSQL('INSERT INTO professor SET ?', input);
};

// function UsuarioDAO(conexaoDb) {
//   this._conexaoDb = conexaoDb;
// }

// module.exports = () => UsuarioDAO;

// /**
//  * Aluno
//  */
// UsuarioDAO.prototype.salvarAluno = function (usuario, callback) {
//   this._conexaoDb.query('INSERT INTO aluno SET ?', usuario, callback);
// };

// UsuarioDAO.prototype.buscarAluno = function (usuario, callback) {
//   this._conexaoDb.query('SELECT * FROM aluno WHERE email = ?', [usuario.email], callback);
// };

// UsuarioDAO.prototype.buscarIdAluno = function (id, callback) {
//   this._conexaoDb.query('SELECT id, nome, email FROM aluno WHERE id = ?', id, callback);
// };

// UsuarioDAO.prototype.listaProfessor = function (callback) {
//   this._conexaoDb.query('SELECT * FROM professor', callback);
// };

// /**
//  * Professor
//  */
// UsuarioDAO.prototype.salvarProfessor = function (usuario, callback) {
//   this._conexaoDb.query('INSERT INTO professor SET ?', usuario, callback);
// };

// UsuarioDAO.prototype.buscarProfessor = function (usuario, callback) {
//   this._conexaoDb.query('SELECT * FROM professor WHERE email = ?', [usuario.email], callback);
// };

// UsuarioDAO.prototype.buscarIdProfessor = function (id, callback) {
//   this._conexaoDb.query('SELECT id, nome, email FROM professor WHERE id = ?', id, callback);
// };

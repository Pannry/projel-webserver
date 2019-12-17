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

// TODO: tirar estrela e por um segundo objeto como entrada.
UsuarioDAO.prototype.findProfessor = async function (input) {
  return this.execSQL('SELECT * FROM professor WHERE ?', input);
};

UsuarioDAO.prototype.createProfessor = async function (input) {
  return this.execSQL('INSERT INTO professor SET ?', input);
};

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

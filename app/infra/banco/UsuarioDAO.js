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

// TODO: tirar estrela e por um segundo objeto como entrada.
UsuarioDAO.prototype.findProfessor = async function (input) {
  if (input) {
    return this.execSQL('SELECT * FROM professor WHERE ?', input);
  }
  return this.execSQL('SELECT * FROM professor', input);
};

UsuarioDAO.prototype.createProfessor = async function (input) {
  return this.execSQL('INSERT INTO professor SET ?', input);
};

UsuarioDAO.prototype.findAluno = async function (input) {
  return this.execSQL('SELECT id, nome, email FROM aluno WHERE ?', input);
};

UsuarioDAO.prototype.createAluno = function (input) {
  return this.execSQL('INSERT INTO aluno SET ?', input);
};

UsuarioDAO.prototype.findAluno = function (input) {
  return this.execSQL('SELECT * FROM aluno WHERE ?', input);
};

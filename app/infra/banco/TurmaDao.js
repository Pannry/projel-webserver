const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function TurmaDao() { }

module.exports = TurmaDao;

TurmaDao.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

TurmaDao.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

TurmaDao.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  // console.log(this.conn.format(sql, input) + '\n');
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

// @Professor
TurmaDao.prototype.find = async function (input) {
  return this.execSQL('SELECT * FROM sala WHERE ?', input);
};

TurmaDao.prototype.create = function (input) {
  return this.execSQL('INSERT INTO sala SET ?', input);
};

TurmaDao.prototype.listarAlunos = function (input) {
  return this.execSQL(
    ` SELECT 
        id_aluno, id_sala, aluno_aceito, nome, email, instituicao_id 
      FROM 
        cursa, aluno 
      WHERE 
        cursa.id_aluno = aluno.id AND
        ?`,
    input,
  );
};

// TODO: Testar a inclusao
TurmaDao.prototype.includeStudent = function (input) {
  return this.execSQL(
    ` UPDATE cursa SET aluno_aceito = 1 
      WHERE ?`,
    input,
  );
};

TurmaDao.prototype.editComment = function (input) {
  return this.execSQL('UPDATE sala SET ? WHERE ?', [input.com, input.id]);
};

TurmaDao.prototype.excluirSala = function (input) {
  return this.execSQL('DELETE FROM sala WHERE ?', input);
};


// Aluno
// SalaDao.prototype.listaSalaProfessor = function (id, callback) {
//   this._conexaoDb.query(
//     ` SELECT * 
//       FROM sala 
//       WHERE id_professor = ? and cod_sala = ?`,
//     [id.id_professor, id.cod_sala], callback,
//   );
// };

// SalaDao.prototype.mostrarComentario = function (entrada, callback) {
//   this._conexaoDb.query('', entrada, callback);
// };

// SalaDao.prototype.listaSalaAluno = function (id, callback) {
//   this._conexaoDb.query(
//     ` SELECT 
//         id_aluno, id_sala, id, nome, semestre 
//       FROM 
//         cursa, sala 
//       WHERE 
//         id_aluno = ? 
//         AND id_sala = id`,
//     id, callback,
//   );
// };

// SalaDao.prototype.verificarAutenticacao = function (ent, callback) {
//   this._conexaoDb.query(
//     ` SELECT * FROM cursa 
//       WHERE cursa.id_aluno = ? AND cursa.id_sala = ?`,
//     [ent.id_aluno, ent.id], callback,
//   );
// };

// SalaDao.prototype.alunoEntrarTurma = function (entrada, callback) {
//   this._conexaoDb.query('INSERT INTO cursa SET ?', entrada, callback);
// };


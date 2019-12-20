const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function ListaDao() { }

module.exports = ListaDao;

ListaDao.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

ListaDao.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

ListaDao.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  console.log(this.conn.format(sql, input) + '\n');
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

ListaDao.prototype.list = function (input) {
  return this.execSQL('SELECT * FROM lista WHERE ?', input);
};

ListaDao.prototype.open = function (input) {
  return this.execSQL('SELECT * FROM lista WHERE id_professor = ? AND id = ?', input);
};

ListaDao.prototype.create = function (input) {
  return this.execSQL('INSERT INTO lista SET ?', input);
};

ListaDao.prototype.showQuestions = function (input) {
  return this.execSQL(
    ` SELECT 
      *
    FROM
      lista_exercicios
    INNER JOIN
      exercicios
        ON lista_exercicios.id_exercicios = exercicios.id
        AND ?`,
    input,
  );
};

ListaDao.prototype.addQuestion = function (input) {
  return this.execSQL('INSERT INTO lista_exercicios SET ?', input);
};

// ExerciciosDao.prototype.listasParaIncluir = function (entrada, callback) {
//   this._conexaoDb.query('INSERT INTO sala_lista SET ?', entrada, callback);
// };

// ExerciciosDao.prototype.excluirLista = function (entrada, callback) {
//   this._conexaoDb.query('DELETE FROM lista WHERE id= ?', entrada, callback);
// };

// ExerciciosDao.prototype.mostrarListaInfo = function (entrada, callback) {
//   this._conexaoDb.query('SELECT * FROM lista where id = ?', entrada, callback);
// };

// ExerciciosDao.prototype.mostrarListaExercicios = function (entrada, callback) {
//   this._conexaoDb.query('SELECT * FROM lista WHERE id_professor = ?', entrada, callback);
// };

// ExerciciosDao.prototype.mostrarExerciciosInclusos = function (entrada, callback) {
//   this._conexaoDb.query(
//     `SELECT 
//         id_sala, id_lista, titulo
//       FROM
//         sala_lista
//       INNER JOIN
//         lista 
//           ON sala_lista.id_lista = lista.id
//           AND sala_lista.id_sala = ?`,
//     entrada, callback,
//   );
// };

// // Aluno

// ExerciciosDao.prototype.criarResposta = function (entrada, callback) {
//   this._conexaoDb.query('INSERT INTO resposta SET ?', entrada, callback);
// };

// ExerciciosDao.prototype.abrirRespostaAluno = function (entrada, callback) {
//   this._conexaoDb.query(
//     ` SELECT 
//           * 
//         FROM 
//           resposta 
//         WHERE 
//           id_exercicios = ? 
//           AND id_aluno = ? 
//           AND id_sala = ?`,
//     [entrada.id_exercicios, entrada.id_aluno, entrada.id_sala], callback,
//   );
// };

// ExerciciosDao.prototype.responderExerciciosAluno = function (entrada, callback) {
//   this._conexaoDb.query(
//     `UPDATE 
//       resposta 
//     SET 
//       resposta = ? 
//     WHERE 
//       id_aluno = ? 
//       AND id_exercicios = ? 
//       AND id_sala = ?`,
//     [entrada.resposta, entrada.id_aluno, entrada.id_exercicios, entrada.id_sala], callback,
//   );
// };

// ExerciciosDao.prototype.mostrarListasAluno = function (entrada, callback) {
//   this._conexaoDb.query(
//     ` SELECT 
//         id_sala, id_lista, titulo
//       FROM
//         sala_lista
//       INNER JOIN
//         lista
//           ON sala_lista.id_lista = lista.id
//           AND sala_lista.id_sala = ?`,
//     entrada, callback,
//   );
// };

// ExerciciosDao.prototype.mostrarExerciciosAluno = function (entrada, callback) {
//   this._conexaoDb.query(
//     ` SELECT 
//         id_lista, id_exercicios, titulo
//       FROM
//         lista_exercicios
//       INNER JOIN
//         exercicios
//           ON exercicios.id = lista_exercicios.id_exercicios 
//           AND lista_exercicios.id_lista = ?`,
//     entrada, callback,
//   );
// };

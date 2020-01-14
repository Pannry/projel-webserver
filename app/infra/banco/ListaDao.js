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
  let values;
  let sql = 'Select * from lista WHERE ?';

  if (Array.isArray(input)) values = input;
  else values = Array.of(input);

  for (let i = 1; i < values.length; i += 1) sql += ' AND ?';

  return this.execSQL(sql, input);
};

ListaDao.prototype.create = function (input) {
  return this.execSQL('INSERT INTO lista SET ?', input);
};

ListaDao.prototype.delete = function (input) {
  return this.execSQL('DELETE FROM lista WHERE ?', input);
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

// ListaDao.prototype.listasParaIncluir = function (input) {
//   return this.execSQL('INSERT INTO sala_lista SET ?', input);
// };

// ListaDao.prototype.mostrarListaInfo = function (input) {
//   return this.execSQL('SELECT * FROM lista where id = ?', input);
// };

// ListaDao.prototype.mostrarListaExercicios = function (input) {
//   return this.execSQL('SELECT * FROM lista WHERE id_professor = ?', input);
// };

// ListaDao.prototype.mostrarExerciciosInclusos = function (input) {
//   return this.execSQL(
//     `SELECT 
//         id_sala, id_lista, titulo
//       FROM
//         sala_lista
//       INNER JOIN
//         lista 
//           ON sala_lista.id_lista = lista.id
//           AND sala_lista.id_sala = ?`,
//     input,
//   );
// };

// // Aluno

// ListaDao.prototype.criarResposta = function (input) {
//   return this.execSQL('INSERT INTO resposta SET ?', input);
// };

// ListaDao.prototype.abrirRespostaAluno = function (input) {
//   return this.execSQL(
//     ` SELECT 
//           * 
//         FROM 
//           resposta 
//         WHERE 
//           id_exercicios = ? 
//           AND id_aluno = ? 
//           AND id_sala = ?`,
//     [input.id_exercicios, input.id_aluno, input.id_sala],
//   );
// };

// ListaDao.prototype.responderExerciciosAluno = function (input) {
//   return this.execSQL(
//     `UPDATE 
//       resposta 
//     SET 
//       resposta = ? 
//     WHERE 
//       id_aluno = ? 
//       AND id_exercicios = ? 
//       AND id_sala = ?`,
//     [input.resposta, input.id_aluno, input.id_exercicios, input.id_sala],
//   );
// };

// ListaDao.prototype.mostrarListasAluno = function (input) {
//   return this.execSQL(
//     ` SELECT 
//         id_sala, id_lista, titulo
//       FROM
//         sala_lista
//       INNER JOIN
//         lista
//           ON sala_lista.id_lista = lista.id
//           AND sala_lista.id_sala = ?`,
//     input,
//   );
// };

// ListaDao.prototype.mostrarExerciciosAluno = function (input) {
//   return this.execSQL(
//     ` SELECT 
//         id_lista, id_exercicios, titulo
//       FROM
//         lista_exercicios
//       INNER JOIN
//         exercicios
//           ON exercicios.id = lista_exercicios.id_exercicios 
//           AND lista_exercicios.id_lista = ?`,
//     input,
//   );
// };

const asyncHandler = require('../../middlewares/async');
const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function ExercicioDao() { }

module.exports = ExercicioDao;

ExercicioDao.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

ExercicioDao.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

ExercicioDao.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  console.log(this.conn.format(sql, input) + '\n');
  let result;
  try {
    result = await this.conn.query(sql, input);
  } catch (error) {
    if (error.errno === 1062) {
      console.log('elemento já adicionado!');
      return undefined;
    }
  }
  this.closeConnection();
  return result[0];
};

ExercicioDao.prototype.list = function (input) {
  let values;
  let sql = 'Select * from exercicios WHERE ?';

  if (Array.isArray(input)) values = input;
  else values = Array.of(input);

  for (let i = 1; i < values.length; i += 1) sql += ' AND ?';

  return this.execSQL(sql, input);
};

ExercicioDao.prototype.create = function (input) {
  return this.execSQL('INSERT INTO exercicios SET ?', input);
};

ExercicioDao.prototype.addMaterial = function (input) {
  return this.execSQL('INSERT INTO exercicios_material SET ?', input);
};

ExercicioDao.prototype.downloadPaths = function (input) {
  return this.execSQL('SELECT file_name FROM exercicios_material WHERE ?', input);
};

ExercicioDao.prototype.download = function (input) {
  return this.execSQL(
    ` SELECT 
      exercicios.id_professor, 
      exercicios.id, 
      exercicios_material.file_name
    FROM
      exercicios
    INNER JOIN
      exercicios_material
        ON exercicios.id = exercicios_material.id
        AND exercicios.id = ?
        AND exercicios_material.file_name = ?`,
    input,
  );
};

ExercicioDao.prototype.delete = function (input) {
  return this.execSQL('DELETE FROM exercicios WHERE ?', input);
};

/**
 *
 * Aluno
 */
ExercicioDao.prototype.showList = function (input) {
  return this.execSQL(
    ` SELECT 
        id_sala, id_lista, titulo
      FROM
        sala_lista
      INNER JOIN
        lista
          ON sala_lista.id_lista = lista.id
          AND sala_lista.id_sala = ?`,
    input,
  );
};

ExercicioDao.prototype.openList = function (input) {
  return this.execSQL(
    ` SELECT 
        id_lista, id_exercicios, titulo
      FROM
        lista_exercicios
      INNER JOIN
        exercicios
          ON exercicios.id = lista_exercicios.id_exercicios 
          AND ?`,
    input,
  );
};

ExercicioDao.prototype.listInfo = function (input) {
  return this.execSQL('SELECT * FROM lista where ?', input);
};

ExercicioDao.prototype.listAwnser = function (input) {

  let values;
  let sql = 'Select * from resposta WHERE ?';

  if (Array.isArray(input)) values = input;
  else values = Array.of(input);

  for (let i = 1; i < values.length; i += 1) sql += ' AND ?';

  return this.execSQL(sql, input);
};

ExercicioDao.prototype.createAwnser = function (input) {
  return this.execSQL('INSERT INTO resposta SET ?', input);
};

ExercicioDao.prototype.updateAwnser = function (input) {
  return this.execSQL(
    `UPDATE 
      resposta 
    SET 
      resposta = ? 
    WHERE 
      id_aluno = ? 
      AND id_exercicios = ? 
      AND id_sala = ?`,
    [input.resposta, input.id_aluno, input.id_exercicios, input.id_sala],
  );
};

ExercicioDao.prototype.listasParaIncluir = function (input) {
  return this.execSQL('INSERT INTO sala_lista SET ?', input);
};

// function ExercicioDao(conexaoDb) {
//   this._conexaoDb = conexaoDb;
// }

// module.exports = () => ExercicioDao;

// // Professor

// // Exercicios

// // Lista de Exercicios

// ExercicioDao.prototype.criarListaExercicios = function (input) {
//   return this.execSQL('INSERT INTO lista SET ?', input);
// };

// ExercicioDao.prototype.adicionarExercicioLista = function (input) {
//   return this.execSQL('INSERT INTO lista_exercicios SET ?', input);
// };

// ExercicioDao.prototype.excluirLista = function (input) {
//   return this.execSQL('DELETE FROM lista WHERE id= ?', input);
// };

// ExercicioDao.prototype.mostrarListaExercicios = function (input) {
//   return this.execSQL('SELECT * FROM lista WHERE id_professor = ?', input);
// };

// ExercicioDao.prototype.abrirLista = function (input) {
//   return this.execSQL('SELECT * FROM lista WHERE id_professor = ? AND id = ?', [input.id_professor, input.id]);
// };

// ExercicioDao.prototype.mostrarQuestoes = function (input) {
//   return this.execSQL(
//     ` SELECT 
//       *
//     FROM
//       lista_exercicios
//     INNER JOIN
//       exercicios
//         ON lista_exercicios.id_exercicios = exercicios.id
//         AND lista_exercicios.id_lista = ?`,
//     input,
//   );
// };

// // Aluno

// ExercicioDao.prototype.mostrarExerciciosAluno = function (input) {
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

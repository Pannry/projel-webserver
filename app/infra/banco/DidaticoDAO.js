const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function DidaticoDao() { }

module.exports = DidaticoDao;

DidaticoDao.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

DidaticoDao.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

DidaticoDao.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  console.log(this.conn.format(sql, input) + '\n');
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

DidaticoDao.prototype.list = function (input) {
  return this.execSQL('SELECT * FROM didatico WHERE ?', input);
};

DidaticoDao.prototype.open = function (input) {
  return this.execSQL('SELECT * FROM didatico WHERE ? AND ?', input);
};

DidaticoDao.prototype.create = function (entrada) {
  return this.execSQL('INSERT INTO didatico SET ?', entrada);
};

DidaticoDao.prototype.addMaterial = function (input) {
  return this.execSQL('INSERT INTO didatico_material SET ?', input);
};

DidaticoDao.prototype.downloadPaths = function (input) {
  return this.execSQL('SELECT file_name FROM didatico_material WHERE ?', input);
};

DidaticoDao.prototype.delete = function (input) {
  return this.execSQL('DELETE FROM didatico WHERE ?', input);
};

DidaticoDao.prototype.download = function (input) {
  return this.execSQL(
    ` SELECT 
        didatico.id_professor, 
        didatico.id, 
        didatico_material.file_name
      FROM 
        didatico 
      INNER JOIN 
        didatico_material 
          ON didatico.id = didatico_material.id
          AND didatico_material.file_name = ?`,
    input,
  );
};

// // Professor

// DidaticoDao.prototype.didaticoParaIncluir = function (entrada) {
//   return this.execSQL('INSERT INTO sala_didatico SET ?', entrada);
// };

// DidaticoDao.prototype.mostrarDidaticosInclusosNaSala = function (entrada) {
//   return this.execSQL(
//     ` SELECT 
//         id_sala, id_didatico, titulo
//       FROM
//         sala_didatico
//       INNER JOIN
//         didatico
//           ON sala_didatico.id_didatico = didatico.id
//           AND sala_didatico.id_sala = ?`,
//     entrada,
//   );
// };


// // Aluno

// DidaticoDao.prototype.abrirDidaticoAluno = function (entrada) {
//   return this.execSQL('SELECT * FROM didatico WHERE id = ?', entrada);
// }; // ok

const dbConn = require('./dbConnection');

const ConnectionDatabase = dbConn();

function NotasDao() { }

module.exports = NotasDao;

NotasDao.prototype.getConnection = async function () {
  this.conn = await new ConnectionDatabase();
};

NotasDao.prototype.closeConnection = async function () {
  await this.conn.end();
  this.conn = undefined;
};

NotasDao.prototype.execSQL = async function (sql, input) {
  await this.getConnection();
  const result = await this.conn.query(sql, input);
  this.closeConnection();
  return result[0];
};

NotasDao.prototype.list = function (input) {
  return this.execSQL(
    ` SELECT 
        id_lista, titulo 
      FROM 
        lista, sala_lista 
      WHERE 
        lista.id = sala_lista.id_lista
        AND id_sala = ?`,
    input,
  );
};

NotasDao.prototype.checkGradeCreated = function (input) {
  let values;
  let sql = 'Select * from nota WHERE ?';

  if (Array.isArray(input)) values = input;
  else values = Array.of(input);

  for (let i = 1; i < values.length; i += 1) sql += ' AND ?';

  return this.execSQL(sql, input);
};

NotasDao.prototype.create = function (input) {
  return this.execSQL('INSERT INTO nota SET ?', input);
};

NotasDao.prototype.showEnrolledStudent = function (input) {
  return this.execSQL(
    ` SELECT 
        nota.id_sala, nota.id_aluno, nota.id_lista, nota
      FROM
        cursa
      INNER JOIN
        nota 
          ON cursa.id_aluno = nota.id_aluno
          AND cursa.id_sala = nota.id_sala
          AND cursa.id_aluno = ?
          AND cursa.id_sala = ?`,
    [input.id_aluno, input.id_sala],
  );
};

NotasDao.prototype.update = function (input) {
  return this.execSQL(
    ` UPDATE 
        nota 
      SET 
        nota = ? 
      WHERE 
        id_aluno = ? 
        AND id_lista = ? 
        AND id_sala = ?`,
    [input.nota, input.id_aluno, input.id_lista, input.id_sala],
  );
};

// resposta está vinculada ao aluno, e não a sala & aluno.
NotasDao.prototype.showAwnser = function (input) {
  return this.execSQL(
    ` SELECT 
        resposta.id_aluno, 
        resposta.id_sala, 
        resposta.id_exercicios, 
        file_name, 
        titulo, 
        descricao, 
        resposta 
      FROM
        resposta
      INNER JOIN
        lista_exercicios 
          ON resposta.id_exercicios = lista_exercicios.id_exercicios
      INNER JOIN
        exercicios
          ON exercicios.id = lista_exercicios.id_exercicios
          AND id_aluno = ?
          AND id_lista = ? 
          AND id_sala = ?`,
    [input.id_aluno, input.id_lista, input.id_sala],
  );
};

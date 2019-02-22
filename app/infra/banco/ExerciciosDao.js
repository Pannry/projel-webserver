function ExerciciosDao(conexaoDb) {
  this._conexaoDb = conexaoDb;
}

module.exports = () => ExerciciosDao;

// Professor

// Exercicios

ExerciciosDao.prototype.criarExercicios = function (exercicio, callback) {
  this._conexaoDb.query('INSERT INTO exercicios SET ?', exercicio, callback);
};

ExerciciosDao.prototype.excluirExercicio = function (exercicio, callback) {
  this._conexaoDb.query('DELETE FROM exercicios WHERE id= ?', exercicio, callback);
};

ExerciciosDao.prototype.listarExercicios = function (idProfessor, callback) {
  this._conexaoDb.query('SELECT * FROM exercicios WHERE id_professor = ?', idProfessor, callback);
};

ExerciciosDao.prototype.abrirExercicio = function (id, callback) {
  this._conexaoDb.query('SELECT * FROM exercicios WHERE id = ?', [id.id_exercicios, id.id_professor], callback);
};

// Lista de Exercicios

ExerciciosDao.prototype.criarListaExercicios = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO lista SET ?', entrada, callback);
};

ExerciciosDao.prototype.adicionarExercicioLista = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO lista_exercicios SET ?', entrada, callback);
};

ExerciciosDao.prototype.adicionarMaterial = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO exercicios_material set ?', entrada, callback);
};

ExerciciosDao.prototype.listasParaIncluir = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO sala_lista SET ?', entrada, callback);
};

ExerciciosDao.prototype.excluirLista = function (entrada, callback) {
  this._conexaoDb.query('DELETE FROM lista WHERE id= ?', entrada, callback);
};

ExerciciosDao.prototype.mostrarListaInfo = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM lista where id = ?', entrada, callback);
};

ExerciciosDao.prototype.mostrarListaExercicios = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM lista WHERE id_professor = ?', entrada, callback);
};

ExerciciosDao.prototype.abrirLista = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM lista WHERE id_professor = ? AND id = ?', [entrada.id_professor, entrada.id], callback);
};

ExerciciosDao.prototype.arquivosDownload = function (id, callback) {
  this._conexaoDb.query('SELECT file_name FROM exercicios_material WHERE id = ?', id, callback);
};

ExerciciosDao.prototype.fazerDownloadExercicio = function (id, callback) {
  this._conexaoDb.query(
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
    [id.id, id.file_name], callback,
  );
};

ExerciciosDao.prototype.mostrarQuestoes = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
      *
    FROM
      lista_exercicios
    INNER JOIN
      exercicios
        ON lista_exercicios.id_exercicios = exercicios.id
        AND lista_exercicios.id_lista = ?`,
    entrada, callback,
  );
};

ExerciciosDao.prototype.mostrarExerciciosInclusos = function (entrada, callback) {
  this._conexaoDb.query(
    `SELECT 
        id_sala, id_lista, titulo
      FROM
        sala_lista
      INNER JOIN
        lista 
          ON sala_lista.id_lista = lista.id
          AND sala_lista.id_sala = ?`,
    entrada, callback,
  );
};

// Aluno

ExerciciosDao.prototype.criarResposta = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO resposta SET ?', entrada, callback);
};

ExerciciosDao.prototype.abrirRespostaAluno = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
          * 
        FROM 
          resposta 
        WHERE 
          id_exercicios = ? 
          AND id_aluno = ? 
          AND id_sala = ?`,
    [entrada.id_exercicios, entrada.id_aluno, entrada.id_sala], callback,
  );
};

ExerciciosDao.prototype.responderExerciciosAluno = function (entrada, callback) {
  this._conexaoDb.query(
    `UPDATE 
      resposta 
    SET 
      resposta = ? 
    WHERE 
      id_aluno = ? 
      AND id_exercicios = ? 
      AND id_sala = ?`,
    [entrada.resposta, entrada.id_aluno, entrada.id_exercicios, entrada.id_sala], callback,
  );
};

ExerciciosDao.prototype.mostrarListasAluno = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        id_sala, id_lista, titulo
      FROM
        sala_lista
      INNER JOIN
        lista
          ON sala_lista.id_lista = lista.id
          AND sala_lista.id_sala = ?`,
    entrada, callback,
  );
};

ExerciciosDao.prototype.mostrarExerciciosAluno = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        id_lista, id_exercicios, titulo
      FROM
        lista_exercicios
      INNER JOIN
        exercicios
          ON exercicios.id = lista_exercicios.id_exercicios 
          AND lista_exercicios.id_lista = ?`,
    entrada, callback,
  );
};

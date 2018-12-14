function DidaticoDAO(conexaoDb) {
  this._conexaoDb = conexaoDb;
}

module.exports = () => DidaticoDAO;

// Professor

DidaticoDAO.prototype.criarDidatico = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO didatico SET ?', entrada, callback);
};

DidaticoDAO.prototype.didaticoParaIncluir = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO sala_didatico SET ?', entrada, callback);
};

DidaticoDAO.prototype.adicionarMaterial = function (id, callback) {
  this._conexaoDb.query('INSERT INTO didatico_material SET ?', id, callback);
};

DidaticoDAO.prototype.excluirDidatico = function (entrada, callback) {
  this._conexaoDb.query('DELETE FROM didatico WHERE id= ?', entrada, callback);
};

DidaticoDAO.prototype.listarDidatico = function (idProfessor, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id_professor = ?', idProfessor, callback);
};

DidaticoDAO.prototype.abrirDidatico = function (id, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id = ? AND id_professor = ?', [id.id, id.id_professor], callback);
};

DidaticoDAO.prototype.arquivosDownload = function (id, callback) {
  this._conexaoDb.query('SELECT file_name FROM didatico_material WHERE id = ?', id, callback);
};

DidaticoDAO.prototype.mostrarListaDidaticos = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id_professor = ?', entrada, callback);
};

DidaticoDAO.prototype.fazerDownloadDidatico = function (id, callback) {
  this._conexaoDb.query(
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
    id.file_name, callback,
  );
};

DidaticoDAO.prototype.mostrarDidaticosInclusosNaSala = function (entrada, callback) {
  this._conexaoDb.query(
    ` SELECT 
        id_sala, id_didatico, titulo
      FROM
        sala_didatico
      INNER JOIN
        didatico
          ON sala_didatico.id_didatico = didatico.id
          AND sala_didatico.id_sala = ?`, 
    entrada, callback);
};


// Aluno

DidaticoDAO.prototype.abrirDidaticoAluno = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id = ?', entrada, callback);
}; // ok

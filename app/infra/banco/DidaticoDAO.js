function DidaticoDAO(conexaoDb) {
  this._conexaoDb = conexaoDb;
}

module.exports = () => DidaticoDAO;

// Professor

DidaticoDAO.prototype.criarDidatico = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO didatico SET ?', entrada, callback);
};

DidaticoDAO.prototype.excluirDidatico = function (entrada, callback) {
  this._conexaoDb.query('delete from didatico where id= ?', entrada, callback);
};

DidaticoDAO.prototype.listarDidatico = function (idProfessor, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id_professor = ?', idProfessor, callback);
};

DidaticoDAO.prototype.abrirDidatico = function (id, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id = ? AND id_professor = ?', [id.id, id.id_professor], callback);
};

DidaticoDAO.prototype.adicionarMaterial = function (id, callback) {
  this._conexaoDb.query('INSERT INTO didatico_material set ?', id, callback);
};

DidaticoDAO.prototype.arquivosDownload = function (id, callback) {
  this._conexaoDb.query(' SELECT file_name FROM didatico_material WHERE id = ?', id, callback);
};

DidaticoDAO.prototype.fazerDownload = function (id, callback) {
  this._conexaoDb.query(
    ' select didatico.id_professor, didatico.id, didatico_material.file_name from ' +
    'didatico, didatico_material where didatico.id = ? and didatico_material.file_name = ? and didatico.id_professor = ?',
    [id.id, id.file_name, id.id_professor], callback,
  );
};

DidaticoDAO.prototype.mostrarListaDidaticos = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id_professor = ?', entrada, callback);
};

DidaticoDAO.prototype.didaticoParaIncluir = function (entrada, callback) {
  this._conexaoDb.query('INSERT INTO sala_didatico SET ?', entrada, callback);
};

DidaticoDAO.prototype.mostrarDidaticosInclusos = function (entrada, callback) {
  this._conexaoDb.query('SELECT id_sala, id_didatico, titulo FROM sala_didatico, didatico ' +
    'WHERE sala_didatico.id_sala = ? AND sala_didatico.id_didatico = didatico.id', entrada, callback);
};

// Aluno

DidaticoDAO.prototype.mostrarDidaticosAluno = function (entrada, callback) {
  this._conexaoDb.query('SELECT id_sala, id_didatico, titulo FROM didatico, sala_didatico ' +
    'WHERE sala_didatico.id_sala = ? AND sala_didatico.id_didatico = didatico.id', entrada, callback);
}; // ok

DidaticoDAO.prototype.abrirDidaticoAluno = function (entrada, callback) {
  this._conexaoDb.query('SELECT * FROM didatico WHERE id = ?', entrada, callback);
}; // ok

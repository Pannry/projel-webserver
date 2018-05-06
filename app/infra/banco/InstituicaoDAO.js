function InstituicaoDAO(conexaoDb) {
  this._conexaoDb = conexaoDb;
}

module.exports = () => InstituicaoDAO;

InstituicaoDAO.prototype.listaInstituicao = function (callback) {
  this._conexaoDb.query('SELECT * FROM instituicao', callback);
};

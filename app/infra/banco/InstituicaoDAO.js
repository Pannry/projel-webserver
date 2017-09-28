module.exports = function() {
    return InstituicaoDAO;
}

function InstituicaoDAO(conexaoDb) {
    this._conexaoDb = conexaoDb;
}

InstituicaoDAO.prototype.listaInstituicao = function(callback) {
    this._conexaoDb.query('SELECT * FROM instituicao', callback);
}

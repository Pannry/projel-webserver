module.exports = function() {
    return InstituicaoDAO;
}

function InstituicaoDAO(conexaoDb) {
    this._conexaoDb = conexaoDb;
}

InstituicaoDAO.prototype.lista = function(callback) {
    this._conexaoDb.query('select * from instituicao', callback);
}

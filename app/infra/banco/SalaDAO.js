module.exports = function() {
    return SalaDao;
}

function SalaDao(conexaoDb) {
    this._conexaoDb = conexaoDb;
}

SalaDao.prototype.addSala = function (entrada, callback) {
    console.log( entrada );
    this._conexaoDb.query(
        'INSERT INTO sala SET ?', entrada, callback
    );
}

SalaDao.prototype.listaSala = function(id, callback) {
    this._conexaoDb.query('SELECT * FROM sala WHERE id_professor = ?', id, callback);
}
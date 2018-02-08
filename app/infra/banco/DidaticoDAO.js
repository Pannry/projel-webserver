module.exports = function () {
    return DidaticoDAO;
}

function DidaticoDAO ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}

/**
 * Professor
 */

DidaticoDAO.prototype.criarDidatico = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO didatico SET ?', entrada, callback );
}

DidaticoDAO.prototype.listarDidatico = function ( id_professor, callback ) {
    this._conexaoDb.query( 'SELECT * FROM didatico WHERE id_professor = ?', id_professor, callback );
}

DidaticoDAO.prototype.abrirDidatico = function ( id, callback ) {
    this._conexaoDb.query( 'SELECT * FROM didatico WHERE id = ? AND id_professor = ?', [ id.id, id.id_professor ], callback );
}
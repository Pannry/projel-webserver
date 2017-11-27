module.exports = function () {
    return NotasDAO;
}

function NotasDAO ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}

/**
 *      Professor
 */

NotasDAO.prototype.selecionarListas = function ( entrada, callback ) {
    this._conexaoDb.query( 'select id_lista, titulo from lista, sala_lista where id_sala = ? AND lista.id = sala_lista.id_lista', entrada, callback );
}

NotasDAO.prototype.criarNotaAlunoSala = function ( entrada, callback ) {
    this._conexaoDb.query( '', entrada, callback );
}

NotasDAO.prototype.AtribuirNotaAlunoSala = function ( entrada, callback ) {
    this._conexaoDb.query( '', entrada, callback );
}
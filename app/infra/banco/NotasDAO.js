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
    this._conexaoDb.query( 'SELECT id_lista, titulo FROM lista, sala_lista WHERE id_sala = ? AND lista.id = sala_lista.id_lista', entrada, callback );
}

NotasDAO.prototype.criarNotaAlunoSala = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO nota SET ?', entrada, callback );
}

NotasDAO.prototype.mostrarNotaAlunoSala = function ( entrada, callback ) {
    this._conexaoDb.query(
        'SELECT nota.id_sala, nota.id_aluno, nota.id_lista, nota FROM cursa, nota WHERE cursa.id_aluno = ? ' +
        'AND cursa.id_aluno = nota.id_aluno AND cursa.id_sala = ? AND cursa.id_sala = nota.id_sala;',
        [ entrada.id_aluno, entrada.id_sala ], callback );
}

NotasDAO.prototype.atualizarNota = function ( entrada, callback ) {
    this._conexaoDb.query(
        'UPDATE nota SET nota = ? WHERE id_aluno = ? AND id_lista = ? AND id_sala = ?',
        [ entrada.nota, entrada.id_aluno, entrada.id_lista, entrada.id_sala ], callback );
}
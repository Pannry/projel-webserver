module.exports = function () {
    return ExerciciosDao;
}

function ExerciciosDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}

/**
 * Professor
 */

/**
 * Exercicios
 */
ExerciciosDao.prototype.criarExercicios = function ( exercicio, callback ) {
    this._conexaoDb.query( 'INSERT INTO exercicios SET ?', exercicio, callback );
}

ExerciciosDao.prototype.listarExercicios = function ( id_professor, callback ) {
    this._conexaoDb.query( 'SELECT * FROM exercicios WHERE id_professor = ?', id_professor, callback );
}

ExerciciosDao.prototype.abrirExercicio = function ( id_questao, callback ) {
    this._conexaoDb.query( 'SELECT * FROM exercicios WHERE id = ?', id_questao, callback );
}

/**
 * Lista de Exercicios
 */

ExerciciosDao.prototype.criarListaExercicios = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO lista SET ?', entrada, callback );
}

ExerciciosDao.prototype.mostrarListaExercicios = function ( entrada, callback ) {
    this._conexaoDb.query( 'SELECT * FROM lista WHERE id_professor = ?', entrada, callback );
}

ExerciciosDao.prototype.abrirLista = function ( entrada, callback ) {
    this._conexaoDb.query( 'SELECT * FROM lista WHERE id_professor = ? AND id = ?', [ entrada.id_professor, entrada.id ], callback );
}

ExerciciosDao.prototype.mostrarQuestoes = function ( entrada, callback ) {
    this._conexaoDb.query( 'SELECT * FROM lista_exercicios, exercicios WHERE ? ' +
        'AND lista_exercicios.id_exercicios = exercicios.id;', entrada, callback );
}

ExerciciosDao.prototype.adicionarExercicioLista = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO lista_exercicios SET ?', entrada, callback );
}

ExerciciosDao.prototype.mostrarListasParaIncluir = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO sala_lista SET ?', entrada, callback );
}

ExerciciosDao.prototype.mostrarExerciciosInclusos = function ( entrada, callback ) {
    this._conexaoDb.query( 'SELECT id_sala, id_lista, id_professor, titulo, descricao ' +
        'FROM sala_lista, lista WHERE sala_lista.id_sala = ? AND sala_lista.id_lista = lista.id', entrada, callback );
}



/**
 *      Aluno
 */

ExerciciosDao.prototype.mostrarListasAluno = function ( entrada, callback ) {
    this._conexaoDb.query( 'SELECT id_sala, id_lista, titulo FROM sala_lista, lista ' +
        'WHERE sala_lista.id_sala = ? AND sala_lista.id_lista = lista.id;', entrada, callback );
}
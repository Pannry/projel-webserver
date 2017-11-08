module.exports = function () {
    return ExerciciosDao;
}

function ExerciciosDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}

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


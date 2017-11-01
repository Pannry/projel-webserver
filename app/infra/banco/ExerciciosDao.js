module.exports = function () {
    return ExerciciosDao;
}

function ExerciciosDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}


ExerciciosDao.prototype.criarExercicios = function ( exercicio, callback ) {
    this._conexaoDb.query(
        'INSERT INTO exercicios SET ?', exercicio, callback
    );
}

ExerciciosDao.prototype.listarExercicios = function ( id_professor, callback ) {
    this._conexaoDb.query( 'select * from exercicio where id_professor = ?', id_professor );
}
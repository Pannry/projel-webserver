module.exports = function () {
    return ExerciciosDao;
}

function ExerciciosDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}


ExerciciosDao.prototype.listaExercicios = function ( id, callback ) {
    this._conexaoDb.query( 'Comando SQL', callback );
}

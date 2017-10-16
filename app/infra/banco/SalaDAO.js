module.exports = function () {
    return SalaDao;
};

function SalaDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}

SalaDao.prototype.addSala = function ( entrada, callback ) {
    this._conexaoDb.query(
        'INSERT INTO sala SET ?', entrada, callback
    );
};

SalaDao.prototype.listaSalaProfessor = function ( id, callback ) {
    this._conexaoDb.query( 'SELECT * FROM sala WHERE id_professor = ?', id, callback );
};

SalaDao.prototype.listaSalaAluno = function ( id, callback ) {
    // SELECT id_aluno, id_sala, id, nome, semestre FROM cursa, sala WHERE id_aluno = 1 AND id_sala = id;
    this._conexaoDb.query( 'SELECT id_aluno, id_sala, id, nome, semestre FROM cursa, sala WHERE id_aluno = ? AND id_sala = id', id, callback );
};

SalaDao.prototype.alunoEntrarTurma = function ( id_aluno, id_sala, callback ) {
    this._conexaoDb.query( 'INSERT INTO cursa (id_aluno, id_sala) VALUES (?, ?)', [ id_aluno, id_sala ], callback );
};

SalaDao.prototype.buscarSala = function ( id, callback ) {
    this._conexaoDb.query( 'select * from sala where id = ?', id, callback );
};
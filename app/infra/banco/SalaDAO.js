module.exports = function () {
    return SalaDao;
};

function SalaDao ( conexaoDb ) {
    this._conexaoDb = conexaoDb;
}


/**
 * Professor 
 */

SalaDao.prototype.addSala = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO sala SET ?', entrada, callback );
};

SalaDao.prototype.listaSalaProfessor = function ( id, callback ) {
    this._conexaoDb.query( 'SELECT * FROM sala WHERE id_professor = ?', id, callback );
};

SalaDao.prototype.buscarSala = function ( id, callback ) {
    this._conexaoDb.query( 'select * from sala where id = ?', id, callback );
};

SalaDao.prototype.listarAlunos = function ( id, callback ) {
    this._conexaoDb.query( 'SELECT id_aluno, id_sala, aluno_aceito, nome, email, instituicao_id ' +
        'from cursa, aluno where id_sala = ? and cursa.id_aluno = aluno.id',
        id, callback );
};

SalaDao.prototype.autenticarAluno = function ( id, callback ) {
    this._conexaoDb.query( 'UPDATE cursa SET aluno_aceito = 1 WHERE cursa.id_aluno = ? and cursa.id_sala = ?', [ id.id_aluno, id.id_sala ], callback );
};


/**
 *  Aluno
 */

SalaDao.prototype.listaSalaAluno = function ( id, callback ) {
    this._conexaoDb.query( 'SELECT id_aluno, id_sala, id, nome, semestre FROM cursa, sala WHERE id_aluno = ? AND id_sala = id', id, callback );
};

SalaDao.prototype.alunoEntrarTurma = function ( entrada, callback ) {
    this._conexaoDb.query( 'INSERT INTO cursa SET ?', entrada, callback );
};

SalaDao.prototype.verificarAutenticacao = function ( ent, callback ) {
    this._conexaoDb.query( 'SELECT * FROM cursa WHERE cursa.id_aluno = ? AND cursa.id_sala = ?', [ ent.id_aluno, ent.id_sala ], callback );
};
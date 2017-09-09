module.exports = function () {
    return UsuarioDAO;
}

function UsuarioDAO(conexaoDb) {
    this._conexaoDb = conexaoDb;
}
/**
 * Aluno
 * 
 */
UsuarioDAO.prototype.salvarAluno = function (usuario, callback) {
    this._conexaoDb.query('INSERT INTO aluno SET ?', usuario, callback);
}

UsuarioDAO.prototype.buscarAluno = function (usuario, callback) {
    this._conexaoDb.query(
        'SELECT * FROM aluno WHERE email = ? AND senha = ?',
        [usuario.email, usuario.senha],
        callback
    );
}

UsuarioDAO.prototype.buscarIdAluno = function (id, callback) {
    this._conexaoDb.query('SELECT * FROM aluno WHERE id = ?', id, callback);
}

/**
 * Professor
 */

UsuarioDAO.prototype.salvarProfessor = function (usuario, callback) {
    this._conexaoDb.query('INSERT INTO professor SET ?', usuario, callback);
}

UsuarioDAO.prototype.buscarProfessor = function (usuario, callback) {
    this._conexaoDb.query(
        'SELECT * FROM professor WHERE email = ? AND senha = ?',
        [usuario.email, usuario.senha],
        callback
    );
}

UsuarioDAO.prototype.buscarIdProfessor = function (id, callback) {
    this._conexaoDb.query('SELECT * FROM professor WHERE id = ?', id, callback);
}
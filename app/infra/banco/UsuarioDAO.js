module.exports = function () {
    return UsuarioDAO;
}

function UsuarioDAO(conexaoDb) {
    this._conexaoDb = conexaoDb;
}

UsuarioDAO.prototype.salvar = function (usuario, callback) {
    this._conexaoDb.query('INSERT INTO aluno SET ?', usuario, callback);
}

UsuarioDAO.prototype.buscarAluno = function (usuario, callback) {
    this._conexaoDb.query(
        'SELECT * FROM aluno WHERE email = ? AND senha = ?',
        [usuario.email, usuario.senha],
        callback
    );
}

UsuarioDAO.prototype.buscarId = function (id, callback) {
    this._conexaoDb.query('SELECT * FROM aluno WHERE id = ?', id, callback);
}


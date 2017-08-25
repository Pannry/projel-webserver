module.exports = function(){
    return UsuarioDAO;
}

function UsuarioDAO(conexaoDb){
    this._conexaoDb = conexaoDb;
}

UsuarioDAO.prototype.salvar = function(usuario, callback){
    this._conexaoDb.query('insert into aluno set ?', usuario, callback);
}

UsuarioDAO.prototype.buscar = function (usuario, callback) {
    this._conexaoDb.query('select id, nome, email, senha from aluno where email=' + usuario.email + 'and senha=' + usuario.senha);
}

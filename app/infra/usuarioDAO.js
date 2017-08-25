module.exports = function(){
    return UsuarioDAO;
}

function UsuarioDAO(conexaoDb){
    this._conexaoDb = conexaoDb;
}

UsuarioDAO.prototype.salvar = function(usuario, callback){
    this._conexaoDb.query('insert into aluno set ?', usuario, callback);
}

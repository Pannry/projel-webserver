module.exports = function(app){
    app.get('/usuario/cadastro', function(request, response){
        response.render('usuario/cadastroUsuario');
    });

    app.post('/usuario', function(request, response){
        var usuario = request.body;
        var conexaoDb = app.infra.dbConnection();
        var usuarioDAO = new app.infra.usuarioDAO(conexaoDb);

        console.log(usuario);

        usuarioDAO.salva(usuario, function(erro, resultado){
            console.log(erro);
            console.log(resultado);
            response.redirect('/usuario/cadastro');
        });
        conexaoDb.end();
    });
}

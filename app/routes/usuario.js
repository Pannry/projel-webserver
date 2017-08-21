module.exports = function(app){
    app.get('/usuario/cadastro', function(request, response){
        var conexaoDb = app.infra.dbConnection();
        var instituicaoDAO = new app.infra.InstituicaoDAO(conexaoDb);

        instituicaoDAO.lista(function(exception, resultado) {

            response.render('usuario/cadastroUsuario', {listaDeInstituicao: resultado});
        });
        conexaoDb.end();
    });

    app.post('/usuario', function(request, response){
        var usuario = request.body;

        var conexaoDb = app.infra.dbConnection();
        var usuarioDAO = new app.infra.usuarioDAO(conexaoDb);

        usuarioDAO.salva(usuario, function(erro, resultado){
            // console.log(erro);
            // console.log(resultado);
            response.redirect('/usuario/cadastro');
        });
        conexaoDb.end();
    });
}

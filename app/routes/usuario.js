module.exports = function(app){
    app.get('/usuario/cadastro', function(request, response){
        response.render('usuario/cadastroUsuario');
    });

    app.post('/usuario', function(request, response){
        var usuario = request.body;

        console.log(usuario);
    });
}

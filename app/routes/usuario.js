module.exports = function(app){
    app.get('/cadastroDoUsuario', function(request, response){
        response.render('usuario/cadastroUsuario');
    });
}

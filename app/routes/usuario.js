// var bcrypt = require('bcrypt-nodejs');
// var passport = require('passport');


module.exports = function (app) {
    var passport = app.get('passport');

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

        usuario.senha = bcrypt.hashSync(usuario.senha, null, null);      

        var conexaoDb = app.infra.dbConnection();
        var usuarioDAO = new app.infra.usuarioDAO(conexaoDb);

        usuarioDAO.salvar(usuario, function(erro, resultado){
            response.redirect('/aluno/cadastro');
        });
        conexaoDb.end();
    });

    app.get('/login', function(req, res){
        res.render('aluno/loginAluno');
    });

    app.post('/login',
        passport.authenticate('local-login'),
        function (req, res) {
            console.log( 'usuario autenticado' );
            console.log(req.user); 

        // res.redirect('caminho');
    });
    
}

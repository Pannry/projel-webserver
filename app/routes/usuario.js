var bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var passport = app.get('passport');

    // Cadastro
    app.get('/signup/aluno', function(req, res){
        var conexaoDb = app.infra.banco.dbConnection();
        var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

        instituicaoDAO.lista(function(exception, resultado) {

            res.render('aluno/signupAluno', {listaDeInstituicao: resultado});
        });
        conexaoDb.end();
    });

    app.post('/signup', function(req, res){
        var usuario = req.body;

        usuario.senha = bcrypt.hashSync(usuario.senha, null, null);      

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.salvar(usuario, function(erro, resultado){
            res.redirect('/signup/aluno');
        });
        conexaoDb.end();
    });

    // Login
    app.get('/login/aluno', function(req, res){
        res.render('aluno/loginAluno');
    });

    app.post('/login',
        passport.authenticate('local-login'),
        function (req, res) {
            console.log(req.user); 

        // res.redirect('caminho');
    });
    
}

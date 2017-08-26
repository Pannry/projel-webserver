var bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var passport = app.get('passport');

    /**
     * Cadastro
     */
    app.get('/signup/aluno', function (req, res) {
        var conexaoDb = app.infra.banco.dbConnection();
        var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

        instituicaoDAO.lista(function (exception, resultado) {
            res.render('aluno/signupAluno', { listaDeInstituicao: resultado });
        });

        conexaoDb.end();
    });

    app.post('/signup', function (req, res) {
        var usuario = req.body;

        // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.salvar(usuario, function (erro, resultado) {
            res.redirect('/profile/aluno');
        });
        conexaoDb.end();
    });


    /**
     * Login 
     */
    app.get('/login/aluno', function (req, res) {
        res.render('aluno/loginAluno');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile/aluno',
        failureRedirect: '/login/aluno',
    }),
        function (req, res) {
            console.log("hello");       //nao ta imprimindo

            if (req.body.remember) { 
                req.session.cookie.maxAge = 1000 * 60 * 3; 
            }
            else { 
                req.session.cookie.expires = false; 
            }

            res.redirect('/');
        });


    /**
     * profile
     */
    app.get('/profile/aluno', checkAuthentication, function (req, res) {
        console.log(req.user);
        res.render('aluno/profileAluno', { user: req.user });
    });

}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}
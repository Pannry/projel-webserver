// TODO: Criar cadastro professor,
// TODO: Criar cadastro conexao com banco de dados para login e cadastro,


var bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var passport = app.get('passport');

    app.get('/professor', function (req, res) {
        res.render('professor/home', {
            page_name: req.path
        });
    })

    /**
     * Cadastro
     */
    app.get('/professor/signup', function (req, res) {
        var conexaoDb = app.infra.banco.dbConnection();
        var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

        instituicaoDAO.lista(function (exception, resultado) {
            res.render('professor/signup', {
                listaDeInstituicao: resultado,
                page_name: req.path
            });
        });

        conexaoDb.end();
    })

    app.post('/professor/signup', function (req, res) {
        var usuario = req.body;

        // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.salvarProfessor(usuario, function (erro, resultado) {
            res.redirect('/professor/login');
        });
        conexaoDb.end();
    })

    /**
     * Login
     */
    app.get('/professor/login', function (req, res) {
        res.render('professor/login');
    })

    app.post('/professor/login', passport.authenticate('local-login-professor', {
        successRedirect: '/professor/profile',
        failureRedirect: '/professor/login',
    }));

    /**
     * Logout
     */
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
     * profile
     */
    app.get('/professor/profile', checkAuth, function (req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/perfil', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        } else {
            res.status(404).send("professor: 404");
        }
    });

    app.get('/professor/profile/turmas', checkAuth, function (req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/turmas', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });

        } else {
            res.status(404).send("professor: 404");
        }
    });
    app.get('/professor/profile/turmas/criar', checkAuth, function (req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/criarTurma', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        } else {
            res.status(404).send("Professor: 404");
        }
    });

}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}
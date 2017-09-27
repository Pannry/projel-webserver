// TODO: Criar cadastro professor,
// TODO: Criar cadastro conexao com banco de dados para login e cadastro,


var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
    var passport = app.get('passport');

    app.get('/professor', function(req, res) {
        if (req.user == undefined) {
            res.render('professor/home', {
                accountType: ""
            });

        } else {
            res.render('professor/home', {
                accountType: req.user.tipo
            });
        }
    })

    /**
     * Cadastro
     */
    app.get('/professor/signup', function(req, res) {
        var conexaoDb = app.infra.banco.dbConnection();
        var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

        instituicaoDAO.lista(function(exception, resultado) {
            res.render('professor/signup', {
                listaDeInstituicao: resultado
            });
        });

        conexaoDb.end();
    })

    app.post('/professor/signup', function(req, res) {
        var usuario = req.body;

        // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.salvarProfessor(usuario, function(erro, resultado) {
            res.redirect('/professor/login');
        });
        conexaoDb.end();
    })

    /**
     * Login
     */
    app.get('/professor/login', function(req, res) {
        res.render('professor/login', { message: req.flash('loginMessage') });
    });

    app.post('/professor/login', passport.authenticate('local-login-professor', {
        successRedirect: '/professor/profile',
        failureRedirect: '/professor/login',
        failureFlash: true
    }));

    /**
     * Logout
     */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /**
     * profile
     */
    app.get('/professor/profile', checkAuth, function(req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/perfil', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    });

    app.get('/professor/profile/turmas', checkAuth, function(req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/turmas', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });

        }
    });
    app.get('/professor/profile/turmas/criar', checkAuth, function(req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/criarTurma', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo,
                accountId: req.user.id
            });
        }
    });
    app.post('/professor/profile/turmas/criar', checkAuth, function(req, res) {
        if (req.user.tipo == 'professor') {
            var turma = req.body;
            var id = req.user.id;
            turma.id_professor = id;

            var conexaoDb = app.infra.banco.dbConnection();
            var salaDAO = new app.infra.banco.SalaDAO(conexaoDb);
    
            salaDAO.addSala(turma, function(err, resultado) {
                res.redirect('/professor/profile/turmas/criar');
            });
    
            conexaoDb.end();
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
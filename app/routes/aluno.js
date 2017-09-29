var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
    var passport = app.get('passport');

    app.get('/', function(req, res) {
        if (req.user == undefined) {
            res.render('index', {
                accountType: ""
            });

        } else {
            res.render('index', {
                accountType: req.user.tipo
            });
        }
    });

    /**
     * Cadastro
     */
    app.get('/aluno/signup', function(req, res) {
        var conexaoDb = app.infra.banco.dbConnection();
        var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

        instituicaoDAO.listaInstituicao(function(exception, resultado) {
            res.render('aluno/signup', {
                listaDeInstituicao: resultado
            });
        });

        conexaoDb.end();
    });

    app.post('/aluno/signup', function(req, res) {
        var usuario = req.body;

        // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.salvarAluno(usuario, function(erro, resultado) {
            res.redirect('/aluno/login');
        });
        conexaoDb.end();
    });


    /**
     * Login 
     */
    app.get('/aluno/login', function(req, res) {
        res.render('aluno/login', { message: req.flash('loginMessage') });
    });

    app.post('/aluno/login', passport.authenticate('local-login-aluno', {
        successRedirect: '/profile',
        failureRedirect: '/aluno/login',
        failureFlash: true
    }));

    /**
     * profile
     */
    app.get('/profile', checkAuthentication, function(req, res) {
        if (req.user.tipo == "aluno") {

            res.render('aluno/perfil/perfil', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    });

    app.get('/profile/turmas', checkAuthentication, function(req, res) {
        if (req.user.tipo == 'aluno') {

            var conexaoDb = app.infra.banco.dbConnection();
            var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);
    
            usuarioDAO.listaProfessor(function (exception, resultado) {
                
                    res.render('aluno/perfil/turmas', {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        listaProf: resultado
                    });
            });
    
            conexaoDb.end();
        }
    });

    app.get('/profile/turmas/:id', checkAuthentication, function (req, res) {
        if (req.user.tipo == 'aluno') {

            idDoProfessor = req.params.id;

            var conexaoDb = app.infra.banco.dbConnection();
            var salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

            salaDAO.listaSala(idDoProfessor, function (err, resultado) {
                res.render('aluno/perfil/turmas_professor', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    listaSala: resultado
                })
            });

        } else {
            res.status(403);
        }

    });
    

    app.get('/profile/notas', checkAuthentication, function(req, res) {
        if (req.user.tipo == 'aluno') {
            res.render('aluno/perfil/notas', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    });


}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}


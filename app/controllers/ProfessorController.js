module.exports = function (app) {
    let passport = app.get('passport');
    professorController = {};

    professorController.cadastro = {
        get: function (req, res) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

            instituicaoDAO.listaInstituicao(function (exception, resultado) {
                res.render('professor/signup', {
                    listaDeInstituicao: resultado
                });
            });

            conexaoDb.end();
        },

        post: function (req, res) {
            var usuario = req.body;

            // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

            var conexaoDb = app.infra.banco.dbConnection();
            var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

            usuarioDAO.salvarProfessor(usuario, function (erro, resultado) {
                res.redirect('/professor/login');
            });
            conexaoDb.end();
        }
    };

    professorController.login = {
        get: function (req, res) {
            res.render('professor/login', { message: req.flash('loginMessage') });
        },

        post: passport.authenticate('local-login-professor', {
            successRedirect: '/professor/profile',
            failureRedirect: '/professor/login',
            failureFlash: true
        })
    };

    professorController.logout = function (req, res) {
        req.logout();
        res.redirect('/');
    };

    professorController.perfil = function (req, res) {
        if (req.user.tipo == 'professor') {
            res.render('professor/perfil/perfil', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    };

    professorController.painelDasTurmas = function (req, res) {
        if (req.user.tipo == 'professor') {
            var conexaoDb = app.infra.banco.dbConnection();
            var salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

            salaDAO.listaSala(req.user.id, function (exception, resultado) {
                res.render('professor/perfil/turmas', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    listaSala: resultado,
                });
            });

            conexaoDb.end();
        }
    };

    professorController.criarTurmas = {
        get: function (req, res) {
            if (req.user.tipo == 'professor') {
                res.render('professor/perfil/criarTurma', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    accountId: req.user.id
                });
            }
        },

        post: function (req, res) {
            if (req.user.tipo == 'professor') {
                var turma = req.body;
                var id = req.user.id;
                turma.id_professor = id;

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

                salaDAO.addSala(turma, function (err, resultado) {
                    res.redirect('/professor/profile/turmas/criar');
                });

                conexaoDb.end();
            }
        }
    };

    professorController.turma = {
        abrir: function (req, res) {
            res.send('<h1>Abrir Turma</>');
        },

        editar: function (req, res) {
            res.send('<h1>Editar Turma</>');
        }
    };


    return professorController;
}
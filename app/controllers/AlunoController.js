module.exports = function (app) {
    var passport = app.get('passport');
    alunoController = {};

    alunoController.cadastro = {
        get: function (req, res) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

            instituicaoDAO.listaInstituicao(function (exception, resultado) {
                res.render('aluno/signup', {
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

            usuarioDAO.salvarAluno(usuario, function (erro, resultado) {
                res.redirect('/aluno/login');
            });
            conexaoDb.end();
        }
    }
    alunoController.login = {
        get: function (req, res) {
            res.render('aluno/login', { message: req.flash('loginMessage') });
        },

        post: passport.authenticate('local-login-aluno', {
            successRedirect: '/profile',
            failureRedirect: '/aluno/login',
            failureFlash: true
        })
    }
    alunoController.perfil = function (req, res) {
        if (req.user.tipo == "aluno") {
            res.render('aluno/perfil/perfil', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    }
    alunoController.minhasTurmas = function (req, res) {
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
    }

    alunoController.turmasProfessor = function (req, res) {
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
        } else { res.status(403); }
    }
    alunoController.notas = function (req, res) {
        if (req.user.tipo == 'aluno') {
            res.render('aluno/perfil/notas', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            });
        }
    }

    return alunoController;

}
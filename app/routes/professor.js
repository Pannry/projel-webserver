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
    app.route('/professor/signup')
        .get( app.controllers.ProfessorController.cadastro.get)
        .post(app.controllers.ProfessorController.cadastro.post);

    /**
     * Login
     */
    app.get('/professor/login', app.controllers.ProfessorController.login.get);
    app.post('/professor/login', app.controllers.ProfessorController.login.post);

    /**
     * Logout
     */
    app.get('/logout', app.controllers.ProfessorController.logout);

    /**
     * profile
     */
    app.get('/professor/profile', checkAuth, app.controllers.ProfessorController.perfil);

    app.get('/professor/profile/turmas', checkAuth, app.controllers.ProfessorController.painelDasTurmas);

    app.get('/professor/profile/turmas/criar', checkAuth, app.controllers.ProfessorController.criarTurmas.get);
    app.post('/professor/profile/turmas/criar', checkAuth, app.controllers.ProfessorController.criarTurmas.post);

}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}
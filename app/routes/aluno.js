var bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var passport = app.get('passport');
    var alunoController = app.controllers.AlunoController;

    app.get('/', function (req, res) {
        ( req.user == undefined ) ?
            res.render('index', { accountType: "" }) :
            res.render('index', { accountType: req.user.tipo })
    });

    /**
     * Cadastro
     */
    app.route('/aluno/signup')
        .get(alunoController.cadastro.get)
        .post(alunoController.cadastro.post);


    /**
     * Login 
     */
    app.get('/aluno/login', alunoController.login.get);
    app.post('/aluno/login', alunoController.login.post);

    /**
     * profile
     */
    app.get('/profile', checkAuthentication, alunoController.perfil);

    app.get('/profile/turmas', checkAuthentication, alunoController.minhasTurmas);

    app.get('/profile/turmas/:id', checkAuthentication, alunoController.turmasProfessor);

    app.get('/profile/notas', checkAuthentication, alunoController.notas);


}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}


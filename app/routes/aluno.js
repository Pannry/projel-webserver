module.exports = function (app) {
    var passport = app.get('passport');
    var Profile = app.controllers.aluno.Profile;
    var Turmas = app.controllers.aluno.Turmas;
    var Exercicios = app.controllers.aluno.Exercicios;


    app.get('/', (req, res) => {
        (req.user == undefined) ?
            res.render('index', { accountType: "" }) :
            res.render('index', { accountType: req.user.tipo });
    });

    /**
     *      Aluno.js
     */
    app.route('/aluno/signup')
        .get(Profile.cadastro.get)
        .post(Profile.cadastro.post);

    app.route('/aluno/login')
        .get(Profile.login.get)
        .post(Profile.login.post);

    app.route('/profile')
        .get(checkAuth, Profile.profile.get);

    app.route('/profile/update')
        .get(checkAuth, Profile.profile.update);


    /**
     *      Turmas.js
     */
    app.route('/profile/turmas')
        .get(checkAuth, Turmas.minhasTurmas.get);

    app.get('/profile/turmas/procurar', checkAuth, Turmas.procurarTurmas.get);

    app.route('/turmas/abrir/:id')
        .get(checkAuth, Turmas.abrirTurma.get);

    app.route('/turmas/professor/:id')
        .get(checkAuth, Turmas.turmasProfessor.get)
        .post(checkAuth, Turmas.turmasProfessor.post);

    /**
     *      Exercicios.js
     */
    app.route('/turmas/abrir/:id_sala/:id_lista')
        .get(checkAuth, Exercicios.listaExercicios.get);

    app.route('/turmas/abrir/:id_sala/:id_lista/:id_exercicio')
        .get(checkAuth, Exercicios.responderExercicios.get)
        .post(checkAuth, Exercicios.responderExercicios.post);

};

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }

}
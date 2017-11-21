var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {

    var passport = app.get( 'passport' );

    var Professor = app.controllers.professor.Professor;
    var Exercicios = app.controllers.professor.Exercicios;
    var Turmas = app.controllers.professor.Turmas;

    app.get( '/professor', function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'professor/home', { accountType: "" } ) :
            res.render( 'professor/home', { accountType: req.user.tipo } );
    } );

    /**
     *  Professor.js
     */

    // Cadastro
    app.route( '/professor/signup' )
        .get( Professor.cadastro.get )
        .post( Professor.cadastro.post );

    // Login
    app.route( '/professor/login' )
        .get( Professor.login.get )
        .post( Professor.login.post );

    // Logout
    app.get( '/logout', Professor.logout );

    // profile
    app.get( '/professor/profile', checkAuth, Professor.perfil.get );
    app.get( '/professor/profile/update', checkAuth, Professor.perfil.update );


    /**
     *      Turmas.js
     */
    app.get( '/professor/profile/turmas', checkAuth, Turmas.painelDasTurmas.get );

    app.route( '/professor/turmas/criar' )
        .get( checkAuth, Turmas.criarTurmas.get )
        .post( checkAuth, Turmas.criarTurmas.post );

    app.route( '/professor/turma/abrir/:id/professor' )
        .get( checkAuth, Turmas.abrir.professor )
        .post( checkAuth, Turmas.abrir.autenticarAlunoNaTurma );

    app.route( '/professor/turma/abrir/:id/aluno' )
        .get( checkAuth, Turmas.abrir.aluno );

    app.route( '/professor/turma/abrir/:id/aluno/incluirlista' )
        .get( checkAuth, Turmas.incluirlista.get )
        .post( checkAuth, Turmas.incluirlista.post );

    // app.post( '/professor/turma/editar/:id', checkAuth, Turmas.turma.editar );
    // app.post('/professor/turma/excluir/:id', checkAuth, Turmas.turma.excluir);


    /**
     *      Exercicios
     */

    // Questões
    app.get( '/professor/profile/exercicios', checkAuth, Exercicios.exercicios.get );

    app.get( '/professor/exercicios/abrir/:id', checkAuth, Exercicios.abrirExercicio.get );

    app.route( '/professor/exercicios/criar' )
        .get( checkAuth, Exercicios.criarExercicios.get )
        .post( checkAuth, Exercicios.criarExercicios.post );

    // Listas
    app.get( '/professor/profile/exercicios/lista', checkAuth, Exercicios.lista.get );

    app.route( '/professor/exercicios/lista/criar' )
        .get( checkAuth, Exercicios.criarLista.get )
        .post( checkAuth, Exercicios.criarLista.post );

    app.route( '/professor/exercicios/lista/abrir/:id/info' )
        .get( checkAuth, Exercicios.abrirLista.mostrarInformacoes );

    app.route( '/professor/exercicios/lista/abrir/:id/questoes' )
        .get( checkAuth, Exercicios.abrirLista.mostrarQuestoes )

    app.route( '/professor/exercicios/lista/abrir/:id/editar' )
        .get( checkAuth, Exercicios.adicionarExercicioNaLista.get )
        .post( checkAuth, Exercicios.adicionarExercicioNaLista.post );


}

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() )
        return next();
    else
        res.redirect( '/' );


}
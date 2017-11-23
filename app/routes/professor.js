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

    app.route( '/professor/signup' )
        .get( Professor.cadastro.get )
        .post( Professor.cadastro.post );

    app.route( '/professor/login' )
        .get( Professor.login.get )
        .post( Professor.login.post );

    app.route( '/logout' )
        .get( Professor.logout );

    app.route( '/professor/profile' )
        .get( checkAuth, Professor.perfil.get );

    app.route( '/professor/profile/update' )
        .get( checkAuth, Professor.perfil.update );


    /**
     *      Turmas.js
     */
    app.route( '/professor/profile/turmas' )
        .get( checkAuth, Turmas.painelDasTurmas.get );

    app.route( '/professor/turmas/criar' )
        .get( checkAuth, Turmas.criarTurmas.get )
        .post( checkAuth, Turmas.criarTurmas.post );

    app.route( '/professor/turma/abrir/:id/professor' )
        .get( checkAuth, Turmas.abrir.professorGET )
        .post( checkAuth, Turmas.abrir.autenticarAlunoNaTurma );

    // app.route( '/professor/turma/abrir/:id/professor/:id_aluno' ).get().post();

    app.route( '/professor/turma/abrir/:id/aluno' )
        .get( checkAuth, Turmas.abrir.alunoGET )
        .post( checkAuth, Turmas.abrir.comentario );

    app.route( '/professor/turma/abrir/:id/aluno/incluirlista' )
        .get( checkAuth, Turmas.incluirlista.get )
        .post( checkAuth, Turmas.incluirlista.post );

    // app.post( '/professor/turma/editar/:id', checkAuth, Turmas.turma.editar );
    // app.post('/professor/turma/excluir/:id', checkAuth, Turmas.turma.excluir);


    /**
     *      Exercicios
     */

    // Questões
    app.route( '/professor/profile/exercicios' )
        .get( checkAuth, Exercicios.exercicios.get );

    app.route( '/professor/exercicios/abrir/:id' )
        .get( checkAuth, Exercicios.abrirExercicio.get );

    app.route( '/professor/exercicios/criar' )
        .get( checkAuth, Exercicios.criarExercicios.get )
        .post( checkAuth, Exercicios.criarExercicios.post );

    // Listas
    app.route( '/professor/profile/exercicios/lista' )
        .get( checkAuth, Exercicios.lista.get );

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
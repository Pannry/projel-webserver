var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var ProfessorController = app.controllers.professor.ProfessorController;
    var ExercicioController = app.controllers.professor.ExercicioController;

    app.get( '/professor', function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'professor/home', { accountType: "" } ) :
            res.render( 'professor/home', { accountType: req.user.tipo } );
    } )

    /**
     * Cadastro
     */
    app.route( '/professor/signup' )
        .get( ProfessorController.cadastro.get )
        .post( ProfessorController.cadastro.post );

    /**
     * Login
     */
    app.route( '/professor/login' )
        .get( ProfessorController.login.get )
        .post( ProfessorController.login.post );

    /**
     * Logout
     */
    app.get( '/logout', ProfessorController.logout );

    /**
     * profile
     */
    app.get( '/professor/profile', checkAuth, ProfessorController.perfil.get );
    app.get( '/professor/profile/update', checkAuth, ProfessorController.perfil.update );


    /**
     *      Turmas
     */
    app.get( '/professor/profile/turmas', checkAuth, ProfessorController.painelDasTurmas.get );

    app.route( '/professor/turmas/criar' )
        .get( checkAuth, ProfessorController.criarTurmas.get )
        .post( checkAuth, ProfessorController.criarTurmas.post );

    app.get( '/professor/turma/abrir/:id/professor', checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirProfessor
    );
    app.get( '/professor/turma/abrir/:id/aluno', checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirAluno
    );
    app.post( '/professor/turma/editar/:id', checkAuth, ProfessorController.turma.editar );
    // app.post('/professor/turma/excluir/:id', checkAuth, ProfessorController.turma.excluir);


    /**
     *      Exercicios
     */
    app.get( '/professor/profile/exercicios', checkAuth, ExercicioController.exercicios.get );

    app.get( '/professor/exercicios/abrir/:id', checkAuth, ExercicioController.abrirExercicio.get );

    app.route( '/professor/exercicios/criar' )
        .get( checkAuth, ExercicioController.criarExercicios.get )
        .post( checkAuth, ExercicioController.criarExercicios.post );

    /**
     *      Lista
     */

    app.get( '/professor/profile/exercicios/lista', checkAuth, ExercicioController.lista.get );

    app.route( '/professor/exercicios/lista/criar' )
        .get( checkAuth, ExercicioController.criarLista.get )
        .post( checkAuth, ExercicioController.criarLista.post );

    app.route( '/professor/exercicios/lista/abrir/:id/info' )
        .get( checkAuth, ExercicioController.abrirLista.mostrarInformacoes );

    app.route( '/professor/exercicios/lista/abrir/:id/questoes' )
        .get( checkAuth, ExercicioController.abrirLista.mostrarQuestoes )

    app.route( '/professor/exercicios/lista/abrir/:id/editar' )
        .get( checkAuth, ExercicioController.adicionarExercicioNaLista.get )
        .post( checkAuth, ExercicioController.adicionarExercicioNaLista.post );


}

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
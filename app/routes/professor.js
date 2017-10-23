var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var ProfessorController = app.controllers.ProfessorController;

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
    app.get( '/professor/login', ProfessorController.login.get );
    app.post( '/professor/login', ProfessorController.login.post );

    /**
     * Logout
     */
    app.get( '/logout', ProfessorController.logout );

    /**
     * profile
     */
    app.get( '/professor/profile', checkAuth, ProfessorController.perfil );

    app.get( '/professor/profile/turmas', checkAuth, ProfessorController.painelDasTurmas );

    app.get( '/professor/profile/turmas/criar', checkAuth, ProfessorController.criarTurmas.get );
    app.post( '/professor/profile/turmas/criar', checkAuth, ProfessorController.criarTurmas.post );

    app.get( '/professor/turma/abrir/:id/professor',
        checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirProfessor
    );
    app.get( '/professor/turma/abrir/:id/aluno',
        checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirAluno
    );
    app.post( '/professor/turma/editar/:id', checkAuth, ProfessorController.turma.editar );
    // app.post('excluirTurma', checkAuth, ProfessorController.turma.excluir);

}

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
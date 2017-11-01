var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var ProfessorController = app.controllers.ProfessorController;

    var paths = [
 /*00*/ '/professor',
 /*01*/ '/professor/signup',
 /*02*/ '/professor/login',
 /*03*/ '/logout',
 /*04*/ '/professor/profile',
 /*05*/ '/professor/profile/turmas',
 /*06*/ '/professor/profile/turmas/criar',
 /*07*/ '/professor/turma/abrir/:id/professor',
 /*08*/ '/professor/turma/abrir/:id/aluno',
 /*09*/ '/professor/turma/editar/:id',
 /*10*/ '/professor/turma/excluir/:id',
 /*11*/ '/professor/profile/exercicios',
 /*12*/ '/professor/profile/exercicios/criar',
 /*13*/ '/professor/profile/exercicios/lista',
 /*14*/ '/professor/profile/exercicios/lista/criar',
 /*15*/ '/professor/profile/update'
    ];

    app.get( paths[ 0 ], function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'professor/home', { accountType: "" } ) :
            res.render( 'professor/home', { accountType: req.user.tipo } );
    } )

    /**
     * Cadastro
     */
    app.route( paths[ 1 ] )
        .get( ProfessorController.cadastro.get )
        .post( ProfessorController.cadastro.post );

    /**
     * Login
     */
    app.route( paths[ 2 ] )
        .get( ProfessorController.login.get )
        .post( ProfessorController.login.post );

    /**
     * Logout
     */
    app.get( paths[ 3 ], ProfessorController.logout );

    /**
     * profile
     */
    app.get( paths[ 4 ], checkAuth, ProfessorController.perfil.get );
    app.get( paths[ 15 ], checkAuth, ProfessorController.perfil.update );


    /**
     *      Turmas
     */
    app.get( paths[ 5 ], checkAuth, ProfessorController.painelDasTurmas.get );

    app.route( paths[ 6 ] )
        .get( checkAuth, ProfessorController.criarTurmas.get )
        .post( checkAuth, ProfessorController.criarTurmas.post );

    app.get( paths[ 7 ], checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirProfessor
    );
    app.get( paths[ 8 ], checkAuth,
        ProfessorController.turma.listaSala,
        ProfessorController.turma.abrirAluno
    );
    app.post( paths[ 9 ], checkAuth, ProfessorController.turma.editar );
    // app.post(paths[ 10 ], checkAuth, ProfessorController.turma.excluir);


    /**
     *      Exercicios
     */
    app.get( paths[ 11 ], checkAuth, ProfessorController.exercicios.get );

    app.route( paths[ 12 ] )
        .get( checkAuth, ProfessorController.criarExercicios.get )
        .post( checkAuth, ProfessorController.criarExercicios.post );

    app.get( paths[ 13 ], checkAuth, ProfessorController.listaExercicios.get );
    app.get( paths[ 14 ], checkAuth, ProfessorController.criarListaExercicios.get );

}

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
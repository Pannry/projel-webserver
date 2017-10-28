var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var ProfessorController = app.controllers.ProfessorController;

    var paths = [
        '/professor',
        '/professor/signup',
        '/professor/login',
        '/logout',
        '/professor/profile',
        '/professor/profile/turmas',
        '/professor/profile/turmas/criar',
        '/professor/turma/abrir/:id/professor',
        '/professor/turma/abrir/:id/aluno',
        '/professor/turma/editar/:id',
        '/professor/turma/excluir/:id',
        '/professor/profile/exercicios',
        '/professor/profile/exercicios/criar',
        '/professor/profile/exercicios/lista',
        '/professor/profile/exercicios/lista/criar'
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
    app.get( paths[ 2 ], ProfessorController.login.get );
    app.post( paths[ 2 ], ProfessorController.login.post );

    /**
     * Logout
     */
    app.get( paths[ 3 ], ProfessorController.logout );

    /**
     * profile
     */
    app.get( paths[ 4 ], checkAuth, ProfessorController.perfil );


    /**
     *      Turmas
     */
    app.get( paths[ 5 ], checkAuth, ProfessorController.painelDasTurmas );

    app.get( paths[ 6 ], checkAuth, ProfessorController.criarTurmas.get );
    app.post( paths[ 6 ], checkAuth, ProfessorController.criarTurmas.post );

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
    app.get( paths[ 12 ], checkAuth, ProfessorController.criarExercicios.get );

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
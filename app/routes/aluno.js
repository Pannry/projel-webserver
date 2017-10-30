var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var alunoController = app.controllers.AlunoController;

    var paths = [
/*00*/  '/',
/*01*/  '/aluno/signup',
/*02*/  '/aluno/login',
/*03*/  '/profile',
/*04*/  '/profile/turmas',
/*05*/  '/profile/turmas/procurar',
/*06*/  '/profile/turmas/professor/:id',
/*07*/  '/profile/update'
    ];

    app.get( paths[ 0 ], function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'index', { accountType: "" } ) :
            res.render( 'index', { accountType: req.user.tipo } );
    } );

    /**
     * Cadastro
     */
    app.route( paths[ 1 ] )
        .get( alunoController.cadastro.get )
        .post( alunoController.cadastro.post );


    /**
     * Login 
     */
    app.get( paths[ 2 ], alunoController.login.get );
    app.post( paths[ 2 ], alunoController.login.post );

    /**
     * profile
     */
    app.get( paths[ 3 ], checkAuthentication, alunoController.perfil.get );
    app.get( paths[ 7 ], checkAuthentication, alunoController.perfil.update );

    app.get( paths[ 4 ], checkAuthentication, alunoController.minhasTurmas.get );

    app.get( paths[ 5 ], checkAuthentication, alunoController.procurarTurmas.get );

    app.get( paths[ 6 ], checkAuthentication, alunoController.turmasProfessor.get );
    app.post( paths[ 6 ], checkAuthentication, alunoController.turmasProfessor.post );



};

function checkAuthentication ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
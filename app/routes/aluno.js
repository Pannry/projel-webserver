var bcrypt = require( 'bcrypt-nodejs' );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var alunoController = app.controllers.aluno.AlunoController;


    app.get( '/', function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'index', { accountType: "" } ) :
            res.render( 'index', { accountType: req.user.tipo } );
    } );

    /**
     * Cadastro
     */
    app.route( '/aluno/signup' )
        .get( alunoController.cadastro.get )
        .post( alunoController.cadastro.post );


    /**
     * Login 
     */
    app.route( '/aluno/login' )
        .get( alunoController.login.get )
        .post( alunoController.login.post );

    /**
     * profile
     */
    app.get( '/profile', checkAuthentication, alunoController.perfil.get );
    app.get( '/profile/update', checkAuthentication, alunoController.perfil.update );

    /**
     * Turmas
     */

    app.get( '/profile/turmas', checkAuthentication, alunoController.minhasTurmas.get );

    app.get( '/turmas/abrir/:id', checkAuthentication, alunoController.abrirTurma.get );

    /**
     * Procurar Turmas
     */

    app.get( '/profile/turmas/procurar', checkAuthentication, alunoController.procurarTurmas.get );

    app.route( '/turmas/professor/:id' )
        .get( checkAuthentication, alunoController.turmasProfessor.get )
        .post( checkAuthentication, alunoController.turmasProfessor.post );





};

function checkAuthentication ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
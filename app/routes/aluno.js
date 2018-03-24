module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    var Aluno = app.controllers.aluno.Aluno;
    var Turmas = app.controllers.aluno.Turmas;
    var Exercicios = app.controllers.aluno.Exercicios;


    app.get( '/', function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'index', { accountType: "" } ) :
            res.render( 'index', { accountType: req.user.tipo } );
    } );

    /**
     *      Aluno.js
     */
    app.route( '/aluno/signup' )
        .get( Aluno.cadastro.get )
        .post( Aluno.cadastro.post );

    app.route( '/aluno/login' )
        .get( Aluno.login.get )
        .post( Aluno.login.post );

    app.route( '/profile' )
        .get( checkAuth, Aluno.perfil.get );

    app.route( '/profile/update' )
        .get( checkAuth, Aluno.perfil.update );


    /**
     *      Turmas.js
     */
    app.route( '/profile/turmas' )
        .get( checkAuth, Turmas.minhasTurmas.get );

    app.get( '/profile/turmas/procurar', checkAuth, Turmas.procurarTurmas.get );

    app.route( '/turmas/abrir/:id' )
        .get( checkAuth, Turmas.abrirTurma.get );

    app.route( '/turmas/professor/:id' )
        .get( checkAuth, Turmas.turmasProfessor.get )
        .post( checkAuth, Turmas.turmasProfessor.post );

    /**
     *      Exercicios.js
     */
    app.route( '/turmas/abrir/:id_sala/:id_lista' )
        .get( checkAuth, Exercicios.lista.get );

    app.route( '/turmas/abrir/:id_sala/:id_lista/:id_exercicio' )
        .get( checkAuth, Exercicios.responderExercicio.get )
        .post( checkAuth, Exercicios.responderExercicio.post )

};

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect( '/' );
    }

}
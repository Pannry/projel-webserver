var multer = require( 'multer' );

var storage = multer.diskStorage( {
    destination: 'app/uploads/',
    filename: function ( req, file, cb ) {
        cb( null, Date.now().toString().substring( 5, 13 ) + '_' + file.originalname )
    }
} );

const upload = multer( { storage: storage } );

module.exports = function ( app ) {

    var passport = app.get( 'passport' );

    var Profile = app.controllers.professor.Profile;
    var Turmas = app.controllers.professor.Turmas;
    var Exercicios = app.controllers.professor.Exercicios;
    var Notas = app.controllers.professor.Notas;
    var Didatico = app.controllers.professor.Didatico;

    app.get( '/professor', function ( req, res ) {
        ( req.user == undefined ) ?
            res.render( 'professor/home', { accountType: "" } ) :
            res.render( 'professor/home', { accountType: req.user.tipo } );
    } );

    /**
     *  Professor.js
     */

    app.route( '/professor/signup' )
        .get( Profile.cadastro.get )
        .post( Profile.cadastro.post );

    app.route( '/professor/login' )
        .get( Profile.login.get )
        .post( Profile.login.post );

    app.route( '/logout' )
        .get( Profile.logout.logout );

    app.route( '/professor/profile' )
        .get( checkAuth, Profile.profile.get );

    app.route( '/professor/profile/update' )
        .get( checkAuth, Profile.profile.update );


    /**
     *      Turmas.js
     */

    app.route( '/professor/profile/turmas' )
        .get( checkAuth, Turmas.TurmaPainel.get );

    app.route( '/professor/turmas/criar' )
        .get( checkAuth, Turmas.TurmaCriar.get )
        .post( checkAuth, Turmas.TurmaCriar.post );

    app.route( '/professor/turma/abrir/:id/professor' )
        .get( checkAuth, Turmas.TurmaAbrir.professorGET )
        .post( checkAuth, Turmas.TurmaAbrir.autenticarAlunoNaTurma )

    app.route( '/professor/turma/abrir/:id/aluno' )
        .get( checkAuth, Turmas.TurmaAbrir.alunoGET )
        .post( checkAuth, Turmas.TurmaAbrir.comentario );

    app.route( '/professor/turma/abrir/:id/aluno/incluirlista' )
        .get( checkAuth, Turmas.TurmaIncluirLista.get )
        .post( checkAuth, Turmas.TurmaIncluirLista.post );

    app.route( '/professor/turma/abrir/:id/aluno/incluirDidatico' )
        .get( checkAuth, Turmas.TurmaIncluirDidatico.get )
        .post( checkAuth, Turmas.TurmaIncluirDidatico.post );

    // app.post( '/professor/turma/editar/:id', checkAuth, Turmas.turma.editar );
    // app.post('/professor/turma/excluir/:id', checkAuth, Turmas.turma.excluir);


    /**
     *      Exercicios
     */

    // Questões
    app.route( '/professor/profile/exercicios' )
        .get( checkAuth, Exercicios.Exercicios.get );

    app.route( '/professor/exercicios/abrir/:id' )
        .get( checkAuth, Exercicios.ExerciciosAbrir.get );

    app.route( '/professor/exercicios/criar' )
        .get( checkAuth, Exercicios.ExerciciosCriar.get )
        .post( checkAuth, upload.array( 'fileUpload', 5 ), Exercicios.ExerciciosCriar.post );

    app.route( '/professor/exercicios/abrir/:id/download/:path' )
        .get( checkAuth, Exercicios.ExerciciosDownload.get );


    // Listas
    app.route( '/professor/profile/exercicios/lista' )
        .get( checkAuth, Exercicios.Listas.get );

    app.route( '/professor/exercicios/lista/criar' )
        .get( checkAuth, Exercicios.ListasCriar.get )
        .post( checkAuth, Exercicios.ListasCriar.post );

    app.route( '/professor/exercicios/lista/abrir/:id/info' )
        .get( checkAuth, Exercicios.ListasAbrir.mostrarInformacoes );

    app.route( '/professor/exercicios/lista/abrir/:id/questoes' )
        .get( checkAuth, Exercicios.ListasAbrir.mostrarQuestoes )

    app.route( '/professor/exercicios/lista/abrir/:id/editar' )
        .get( checkAuth, Exercicios.ListasAdicionarExercicios.get )
        .post( checkAuth, Exercicios.ListasAdicionarExercicios.post );

    /**
     *      Nota
     */
    app.route( '/professor/turma/abrir/:id_sala/professor/:id_aluno' )
        .get( checkAuth, Notas.Notas.professorGET )

    app.route( '/professor/turma/abrir/:id_sala/professor/:id_aluno/:id_lista' )
        .get( checkAuth, Notas.Notas.verRespostas )
        .post( checkAuth, Notas.Notas.post );

    /**
     *      MATERIAL DIDATICO
     */

    app.route( '/professor/profile/didatico' )
        .get( checkAuth, Didatico.DidaticoPainel.get );

    app.route( '/professor/profile/didatico/criar' )
        .get( checkAuth, Didatico.DidaticoCriar.get )
        .post( checkAuth, upload.array( 'fileUpload', 5 ), Didatico.DidaticoCriar.post );

    app.route( '/professor/didatico/abrir/:id/download/:path' )
        .get( checkAuth, Didatico.DidaticoDownload.get );

    app.route( '/professor/didatico/abrir/:id/' )
        .get( checkAuth, Didatico.DidaticoAbrir.get );



}

function checkAuth ( req, res, next ) {
    if ( req.isAuthenticated() )
        return next();
    else
        res.redirect( '/' );
}
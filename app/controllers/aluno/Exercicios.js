module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    Exercicios = {};

    Exercicios.lista = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user, page_name: req.path, accountType: req.user.tipo,
                    sala: req.params.id_sala, lista: req.params.id_lista
                }

                let entrada = {
                    id_sala: req.params.id_sala, id_lista: req.params.id_lista
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarExerciciosAluno( entrada.id_lista, function ( err, resultado ) {
                    ejs.exercicios = resultado;
                    res.render( 'aluno/perfil/exercicios/abrirListaAluno.ejs', ejs );
                } );
                conexaoDb.end();
            } else
                res.status( 403 );
        }
    }


    Exercicios.responderExercicio = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let entrada = req.params.id_exercicio;

                let ejs = {
                    user: req.user, page_name: req.path, accountType: req.user.tipo,
                    sala: req.params.id_sala, lista: req.params.id_lista, exercicio: req.params.id_exercicio
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarExercicioUnicoAluno( entrada, function ( err, resultado ) {
                    ejs.resultadoExercicio = resultado;
                    res.render( 'aluno/perfil/exercicios/responderExercicio.ejs', ejs );
                } );
                conexaoDb.end();

            } else
                res.status( 403 );
        },
        post: function ( req, res ) {
            let entrada = {
                id_aluno: req.user.id, id_exercicios: req.params.id_exercicio, foto: ''
            }

            ejs = {
                sala: req.params.id_sala, lista: req.params.id_lista
            }

            entrada.resposta = req.body.resposta;

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.responderExerciciosAluno( entrada, function ( err, resultado ) {
                res.redirect( '/turmas/abrir/' + ejs.sala + '/' + ejs.lista );
            } );

            conexaoDb.end();
        }
    }

    return Exercicios;
};

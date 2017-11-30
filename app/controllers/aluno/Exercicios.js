module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    Exercicios = {};

    Exercicios.lista = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    sala: req.params.id_sala,
                    lista: req.params.id_lista
                }

                let entrada = {
                    id_lista: req.params.id_lista,
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarExerciciosAluno( entrada.id_lista, function ( err, resultado ) {
                    ejs.exercicios = resultado;
                    res.render( 'aluno/perfil/exercicios/abrirListaAluno', ejs );

                } );
                conexaoDb.end();
            } else
                res.status( 403 );
        }
    }


    Exercicios.responderExercicio = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let entrada = {
                    id_exercicios: req.params.id_exercicio,
                    id_sala: req.params.id_sala,
                    id_aluno: req.user.id,
                    resposta: '',
                    pdf_path: ''
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    sala: req.params.id_sala,
                    lista: req.params.id_lista,
                    respostaAluno: ''
                }

                let conexaoDb3 = app.infra.banco.dbConnection();
                let ExerciciosDao3 = new app.infra.banco.ExerciciosDao( conexaoDb3 );

                ExerciciosDao3.abrirExercicio( entrada.id_exercicios, function ( err, resultado3 ) {
                    ejs.exercicio = resultado3;

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let ExerciciosDao2 = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    ExerciciosDao2.abrirRespostaAluno( entrada, function ( err, resultado2 ) {
                        if ( resultado2.length === 0 ) {
                            let conexaoDb1 = app.infra.banco.dbConnection();
                            let ExerciciosDao1 = new app.infra.banco.ExerciciosDao( conexaoDb1 );

                            ExerciciosDao1.criarResposta( entrada, function ( err, resultado ) {
                                res.render( 'aluno/perfil/exercicios/responderExercicio', ejs );
                            } );

                            conexaoDb1.end();
                        } else {
                            ejs.respostaAluno = resultado2[ 0 ].resposta;
                            res.render( 'aluno/perfil/exercicios/responderExercicio', ejs );
                        }
                    } );
                    conexaoDb2.end();
                } );
                conexaoDb3.end();


            } else
                res.status( 403 );
        },

        post: function ( req, res ) {
            let entrada = {
                id_aluno: req.user.id,
                id_exercicios: req.params.id_exercicio,
                id_sala: req.params.id_sala,
                pdf_path: '',
                resposta: req.body.resposta
            }

            ejs = {
                sala: req.params.id_sala,
                lista: req.params.id_lista
            }

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

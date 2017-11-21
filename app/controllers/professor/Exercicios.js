module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    /**
     *      Exercicios
     */

    Exercicios.exercicios = {
        get: function ( req, res, next ) {

            usuario = req.user;

            if ( usuario.tipo == 'professor' ) {

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( usuario.id, function ( err, resultado ) {
                    if ( !err ) {
                        res.render( 'professor/perfil/exercicios/exercicios', {
                            listaExercicios: resultado,
                            user: usuario,
                            page_name: req.path,
                            accountType: usuario.tipo
                        } );
                    } else
                        next();
                } );
                conexaoDb.end();
            };
        }
    };

    Exercicios.criarExercicios = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                res.render( 'professor/perfil/exercicios/criarExercicios', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            };
        },

        post: function ( req, res, next ) {
            if ( req.user.tipo == 'professor' ) {

                let exercicio = {
                    id_professor: req.user.id,
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                    foto: ''
                };

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.criarExercicios( exercicio, function ( err ) {
                    if ( !err )
                        res.redirect( '/professor/profile/exercicios' );
                    else {
                        console.log( err );
                        next();
                    }
                } );
                conexaoDb.end();
            }
        }
    };

    Exercicios.abrirExercicio = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let id_questao = req.params.id;

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.abrirExercicio( id_questao, function ( err, resultado ) {
                    res.render( 'professor/perfil/exercicios/abrirExercicio', {
                        questao: resultado,
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo
                    } );
                } );
                conexaoDb.end();
            };
        }
    };

    /**
     *      Listas
     */

    Exercicios.lista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                id_professor = req.user.id

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarListaExercicios( id_professor, function ( err, resultado ) {
                    res.render( 'professor/perfil/exercicios/lista', {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        lista: resultado

                    } );
                } );
                conexaoDb.end();
            }
        }
    };


    Exercicios.criarLista = {
        get: function ( req, res ) {
            res.render( 'professor/perfil/exercicios/criarLista', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        },
        post: function ( req, res ) {
            let entrada = {
                id_professor: req.user.id,
                titulo: req.body.titulo,
                descricao: req.body.descricao
            }
            var conexaoDb = app.infra.banco.dbConnection();
            var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.criarListaExercicios( entrada, function ( err, resultado ) {
                if ( !err )
                    res.redirect( '/professor/exercicios/lista/abrir/' + resultado.insertId + "/editar" );
                else {
                    console.log( err );
                    next();
                }
            } );
            conexaoDb.end();
        }
    };


    Exercicios.adicionarExercicioNaLista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                id_professor = req.user.id

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( id_professor, function ( err, resultado ) {
                    res.render( 'professor/perfil/exercicios/adicionarExercicios', {
                        user: req.user,
                        user_id: req.user.id,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        id_lista: req.params.id,
                        lista: resultado
                    } );
                } );
                conexaoDb.end();
            }
        },
        post: function ( req, res ) {

            let entrada = {}
            let checkbox = req.body.options;

            entrada.id_lista = req.params.id;
            let vetor = [];

            for ( let i = 0; i < checkbox.length; i++ ) {
                vetor[ i ] = checkbox[ i ];
            }

            vetor.forEach( element => {
                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                entrada.id_exercicios = element;
                ExerciciosDao.adicionarExercicioLista( entrada, function ( err ) { } );

                conexaoDb.end();
            } );

            res.redirect( '/professor/profile/exercicios/lista' );
        }
    };


    Exercicios.abrirLista = {
        mostrarInformacoes: function ( req, res ) {

            let entrada = {
                id_professor: req.user.id,
                id: req.params.id
            };

            var conexaoDb = app.infra.banco.dbConnection();
            var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.abrirLista( entrada, function ( err, resultado ) {
                res.render( 'professor/perfil/exercicios/abrirListaInfo', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    lista: resultado,
                    id: req.params.id
                } );
            } );

            conexaoDb.end();
        },
        mostrarQuestoes: function ( req, res ) {

            let entrada = {
                id_lista: req.params.id
            };
            var conexaoDb = app.infra.banco.dbConnection();
            var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.mostrarExerciciosLista( entrada, function ( err, resultado ) {
                res.render( 'professor/perfil/exercicios/abrirListaExercicios', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    exercicios: resultado,
                    id: req.params.id
                } );
            } );
            conexaoDb.end();
        }
    };

    return Exercicios;
}

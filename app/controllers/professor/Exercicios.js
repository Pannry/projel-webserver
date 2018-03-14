module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    /**
     *      Exercicios
     */

    Exercicios.exercicios = {
        get: function ( req, res, next ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( entrada, ( err, resultado ) => {
                    ejs.listaExercicios = resultado;

                    if ( !err )
                        res.render( 'professor/perfil/exercicios/exercicios', ejs );
                    else
                        next();

                } );
                conexaoDb.end();

            };
        }
    };

    Exercicios.criarExercicios = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }
                res.render( 'professor/perfil/exercicios/criarExercicios', ejs );
            };
        },

        post: function ( req, res, next ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    id_professor: req.user.id,
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.criarExercicios( entrada, ( err, results ) => {
                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let ExerciciosDao2 = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    req.files.forEach( element => {
                        let entrada2 = {
                            id: results.insertId, // retorna a PRIMARY KEY do INSERT anterior
                            file_name: element.filename
                        }
                        ExerciciosDao2.adicionarMaterial( entrada2, ( err ) => { } );
                    } );

                    conexaoDb2.end();

                    if ( !err )
                        res.redirect( '/professor/profile/exercicios' );
                    else
                        next();
                } );
                conexaoDb.end();

            }
        }
    };

    Exercicios.abrirExercicio = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                let entrada = {
                    id: req.params.id,
                    id_professor: req.user.id
                }
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }
                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.abrirExercicio( entrada, ( err, resultado ) => {
                    if ( resultado.length == 0 ) res.render( 'erro/403', ejs );
                    else {
                        ejs.questao = resultado;
                        let entrada2 = resultado[ 0 ].id;

                        let conexaoDb2 = app.infra.banco.dbConnection();
                        let ExerciciosDao2 = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                        ExerciciosDao2.arquivosDownload( entrada2, ( err, resultado2 ) => {
                            ejs.paths = resultado2;
                            res.render( 'professor/perfil/exercicios/abrirExercicio', ejs );
                        } );
                        conexaoDb2.end();


                    }


                } );
                conexaoDb.end();

            };
        }
    };

    Exercicios.downloadExercicios = {
        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    id: req.params.id,
                    file_name: req.params.path,
                    id_professor: req.user.id
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.fazerDownload( entrada, ( err, resultado ) => {
                    console.log( resultado );
                    if ( resultado.length == 0 )
                        res.render( 'erro/403', ejs );
                    else {
                        res.download( 'app/uploads/' + resultado[ 0 ].file_name );
                    }
                } );
                conexaoDb.end();


            };
        }
    }

    /**
     *      Listas
     */

    Exercicios.lista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarListaExercicios( entrada, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/lista', ejs );

                } );
                conexaoDb.end();

            }
        }
    };


    Exercicios.criarLista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/exercicios/criarLista', ejs );

            }
        },
        post: function ( req, res ) {

            let entrada = {
                id_professor: req.user.id,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                tipo: req.body.tipoDeLista
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.criarListaExercicios( entrada, ( err, resultado ) => {
                if ( !err )
                    res.redirect( '/professor/exercicios/lista/abrir/' + resultado.insertId + "/editar" );
                else
                    next();

            } );
            conexaoDb.end();

        }
    };


    Exercicios.adicionarExercicioNaLista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    user_id: req.user.id,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    id_lista: req.params.id
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( entrada, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/adicionarExercicios', ejs );

                } );
                conexaoDb.end();

            }
        },

        post: function ( req, res ) {

            let entrada = {
                id_lista: req.params.id
            }

            let checkbox = req.body.options;
            let vetor = [];

            for ( let i = 0; i < checkbox.length; i++ ) vetor[ i ] = checkbox[ i ];

            vetor.forEach( element => {
                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                entrada.id_exercicios = element;
                ExerciciosDao.adicionarExercicioLista( entrada, ( err ) => { } );

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

            let ejs = {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo,
                id: req.params.id
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.abrirLista( entrada, ( err, resultado ) => {
                if ( resultado.length == 0 ) res.render( 'erro/403', ejs );
                else {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/abrirListaInfo', ejs );
                }

            } );

            conexaoDb.end();
        },

        mostrarQuestoes: function ( req, res ) {

            let entrada = {
                id_lista: req.params.id
            };

            let ejs = {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo,
                id: req.params.id
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.mostrarQuestoes( entrada, ( err, resultado ) => {
                ejs.exercicios = resultado;
                res.render( 'professor/perfil/exercicios/abrirListaExercicios', ejs );

            } );
            conexaoDb.end();

        }
    };

    return Exercicios;
}

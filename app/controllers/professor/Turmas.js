module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    turmas = {};

    turmas.painelDasTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaProfessor( entrada, ( err, resultado ) => {
                    ejs.listaSala = resultado;
                    res.render( 'professor/perfil/turmas/turmas', ejs );
                } );

                conexaoDb.end();
            }
        }
    };


    turmas.criarTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                }

                res.render( 'professor/perfil/turmas/criarTurma', ejs );
            }
        },

        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    nome: req.body.nome,
                    semestre: req.body.semestre,
                    id_professor: req.user.id,
                    comentario: ''
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.addSala( entrada, ( err ) => {
                    res.redirect( '/professor/profile/turmas' );
                } );

                conexaoDb.end();
            }
        }
    };


    turmas.abrir = {

        professorGET: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {

                let entrada = req.params.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                let conexaoDb1 = app.infra.banco.dbConnection();
                let salaDAO1 = new app.infra.banco.SalaDAO( conexaoDb1 );

                salaDAO1.buscarSala( entrada, function ( err, saida1 ) {
                    ejs.infoProfessor = saida1;

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let salaDAO2 = new app.infra.banco.SalaDAO( conexaoDb2 );

                    salaDAO2.listarAlunos( entrada, function ( err, saida2 ) {
                        ejs.listaDeAlunos = saida2;

                        if ( !err && saida1.length != 0 ) {
                            if ( saida1[ 0 ].id_professor == req.user.id )
                                res.render( 'professor/perfil/turmas/abrirTurmaProfessor', ejs );
                            else
                                res.render( 'erro/403', ejs );
                        }

                    } );
                    conexaoDb2.end();

                } );
                conexaoDb1.end();

            }
        },

        alunoGET: function ( req, res ) {

            if ( req.user.tipo === "professor" ) {
                let entrada = req.params.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                let conexaoDb1 = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb1 );

                salaDAO.buscarSala( entrada, function ( err, saida1 ) {
                    ejs.infoProfessor = saida1;

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let exercicioDao = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    exercicioDao.mostrarExerciciosInclusos( entrada, ( err, saida2 ) => {
                        ejs.lista = saida2;

                        let conexaoDb3 = app.infra.banco.dbConnection();
                        let didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb3 );

                        didaticoDAO.mostrarDidaticosInclusos( entrada, ( err, saida3 ) => {
                            ejs.didatico = saida3;

                            if ( !err && saida1.length != 0 ) {
                                if ( saida1[ 0 ].id_professor == req.user.id )
                                    res.render( 'professor/perfil/turmas/abrirTurmaAluno', ejs );
                                else
                                    res.render( 'erro/403', ejs );
                            }

                        } );
                        conexaoDb3.end();
                    } );
                    conexaoDb2.end();
                } );
                conexaoDb1.end();

            }
        },

        autenticarAlunoNaTurma: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    id_sala: req.params.id,
                    id_aluno: Object.keys( req.body )[ 0 ]
                };

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.autenticarAluno( entrada, ( err ) => {
                    res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/professor' );
                } );
                conexaoDb.end();

            }
        },

        comentario: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    id: req.params.id,
                    comentario: req.body.comentario
                }
                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.modificarComentario( entrada, ( err ) => {
                    res.redirect( '/professor/turma/abrir/' + entrada.id + '/aluno' );
                } );

                conexaoDb.end();

            }
        }
    };

    turmas.incluirlista = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let id_professor = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarListaExercicios( id_professor, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/turmas/listarListaParaAdicionar', ejs );

                } );
                conexaoDb.end();

            }
        },

        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {}
                entrada.id_sala = req.params.id;

                let checkbox = req.body.options;
                let vetor = [];

                for ( let i = 0; i < checkbox.length; i++ )
                    vetor[ i ] = checkbox[ i ];

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                vetor.forEach( element => {
                    entrada.id_lista = element;
                    ExerciciosDao.listasParaIncluir( entrada, ( err, resultado ) => { } );

                } );

                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' )
            }
        }
    }

    turmas.incluirDidatico = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let id_professor = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                didaticoDAO.mostrarListaDidaticos( id_professor, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/turmas/listarDidaticoParaAdicionar', ejs );

                } );
                conexaoDb.end();

            }
        },
        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                let entrada = {}
                entrada.id_sala = req.params.id;

                let checkbox = req.body.options;
                let vetor = [];

                for ( let i = 0; i < checkbox.length; i++ )
                    vetor[ i ] = checkbox[ i ];

                var conexaoDb = app.infra.banco.dbConnection();
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                vetor.forEach( element => {
                    entrada.id_didatico = element
                    didaticoDAO.didaticoParaIncluir( entrada, ( err, resultado ) => { } );

                } );

                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' )

                // TODO: Ja esta incluindo no banco, falta mostrar em turmas, na conta professor
            }
        }

    }

    return turmas;
    //pequena alteração
};
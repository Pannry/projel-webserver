module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    professorController = {};

    professorController.cadastro = {
        get: function ( req, res ) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( exception, resultado ) {
                res.render( 'professor/signup', {
                    listaDeInstituicao: resultado
                } );
            } );

            conexaoDb.end();
        },

        post: function ( req, res ) {
            var usuario = req.body;

            // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

            var conexaoDb = app.infra.banco.dbConnection();
            var usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

            usuarioDAO.salvarProfessor( usuario, function ( erro, resultado ) {
                res.redirect( '/professor/login' );
            } );
            conexaoDb.end();
        }
    };


    professorController.login = {
        get: function ( req, res ) {
            res.render( 'professor/login', { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-professor', {
            successRedirect: '/professor/profile',
            failureRedirect: '/professor/login',
            failureFlash: true
        } )
    };


    professorController.logout = function ( req, res ) {
        req.logout();
        res.redirect( '/' );
    };


    professorController.perfil = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                res.render( 'professor/perfil/perfil', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            }
        },

        update: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                res.render( 'professor/perfil/atualizarPerfil', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            }
        },
    };


    professorController.painelDasTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaProfessor( req.user.id, function ( exception, resultado ) {
                    res.render( 'professor/perfil/turmas/turmas', {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        listaSala: resultado,
                    } );
                } );

                conexaoDb.end();
            }
        }
    };


    professorController.criarTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                res.render( 'professor/perfil/turmas/criarTurma', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    accountId: req.user.id
                } );
            }
        },

        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                var turma = req.body;
                var id = req.user.id;
                turma.id_professor = id;

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.addSala( turma, function ( err, resultado ) {
                    res.redirect( '/professor/profile/turmas' );
                } );

                conexaoDb.end();
            }
        }
    };


    professorController.turma = {
        editar: function ( req, res ) {
            res.send( '<h1>Abrir Turma</>' );
        },

        listaSala: function ( req, res, next ) {
            if ( req.user.tipo == 'professor' ) {
                req.listaSala = req.params.id;
            }
            next();
        },

        abrirProfessor: function ( req, res, next ) {
            let id = req.params.id;
            var usuario = req.user;

            if ( usuario.tipo === "professor" ) {

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.buscarSala( id, function ( err, resultado ) {
                    if ( !err && resultado.length != 0 ) {
                        let turma = resultado[ 0 ];
                        if ( turma.id_professor == usuario.id )
                            req.infoProfessor = resultado;
                        else
                            res.send( '<h1>Você não é responsável pela - ' + turma.nome + '</>' );
                    }
                } );
                conexaoDb.end();
                next();
            }
        },

        abrirProfessorListarAlunos: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                let id = req.listaSala;

                salaDAO.listarAlunos( id, function ( err, resultado ) {

                    res.render( 'professor/perfil/turmas/abrirTurmaProfessor', {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        accountId: req.user.id,
                        idSala: req.listaSala,
                        infoProfessor: req.infoProfessor,
                        listaDeAlunos: resultado
                    } );
                } );

                conexaoDb.end();

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

                salaDAO.autenticarAluno( entrada, function ( err ) {
                    res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/professor' )
                } );
                conexaoDb.end();
            }
        },

        abrirAluno: function ( req, res ) {
            let id = req.params.id;
            var usuario = req.user;

            if ( usuario.tipo === "professor" ) {

                var conexaoDb = app.infra.banco.dbConnection();

                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.buscarSala( id, function ( err, saida1 ) {

                    var conexaoDb2 = app.infra.banco.dbConnection();
                    var exercicioDao = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    exercicioDao.mostrarExerciciosInclusos( id, function ( err2, saida2 ) {

                        console.log( '1' );


                        res.render( 'professor/perfil/turmas/abrirTurmaAluno', {
                            user: req.user,
                            page_name: req.path,
                            accountType: req.user.tipo,
                            accountId: req.user.id,
                            idSala: req.params.id,
                            infoProfessor: saida1,
                            lista: saida2
                        } );

                    } );
                    conexaoDb2.end();
                } );

                conexaoDb.end();
            }
        }
    };

    professorController.incluirlista = {
        adicionarExerciciosNaTurma: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                id_professor = req.user.id;

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                //TODO: Mostrar as listas adicionadas na turma

                ExerciciosDao.mostrarListaExercicios( id_professor, function ( err, resultado ) {
                    res.render( 'professor/perfil/turmas/listarListaParaAdicionar', {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        idSala: req.params.id,
                        lista: resultado
                    } );
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

                for ( let i = 0; i < checkbox.length; i++ ) vetor[ i ] = checkbox[ i ];

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                vetor.forEach( element => {

                    entrada.id_lista = element
                    ExerciciosDao.mostrarListasParaIncluir( entrada, function ( err, resultado ) { } );

                } );

                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' )
            }
        }
    }

    return professorController;
};
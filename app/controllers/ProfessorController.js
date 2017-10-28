module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    var render = [
        'professor/signup',
        'professor/login',
        'professor/perfil/perfil',
        'professor/perfil/turmas/turmas',
        'professor/perfil/turmas/criarTurma',
        'professor/perfil/turmas/abrirTurmaProfessor',
        'professor/perfil/turmas/abrirTurmaAluno',
        'professor/perfil/exercicios/exercicios',
        'professor/perfil/exercicios/criarExercicios',
        'professor/perfil/exercicios/listaExercicios',
        'professor/perfil/exercicios/criarListaExercicios'

    ];

    var redirect = [
        '/professor/login',
        '/professor/profile',
        '/professor/login',
        '/professor/profile/turmas'
    ];

    professorController = {};


    professorController.cadastro = {
        get: function ( req, res ) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( exception, resultado ) {
                res.render( render[ 0 ], {
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
                res.redirect( redirect[ 0 ] );
            } );
            conexaoDb.end();
        }
    };


    professorController.login = {
        get: function ( req, res ) {
            res.render( render[ 1 ], { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-professor', {
            successRedirect: redirect[ 1 ],
            failureRedirect: redirect[ 2 ],
            failureFlash: true
        } )
    };


    professorController.logout = function ( req, res ) {
        req.logout();
        res.redirect( '/' );
    };


    professorController.perfil = function ( req, res ) {
        if ( req.user.tipo == 'professor' ) {
            res.render( render[ 2 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };


    professorController.painelDasTurmas = function ( req, res ) {
        if ( req.user.tipo == 'professor' ) {
            var conexaoDb = app.infra.banco.dbConnection();
            var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

            salaDAO.listaSalaProfessor( req.user.id, function ( exception, resultado ) {
                res.render( render[ 3 ], {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    listaSala: resultado,
                } );
            } );

            conexaoDb.end();
        }
    };


    professorController.criarTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                res.render( render[ 4 ], {
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
                    res.redirect( redirect[ 3 ] );
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
                req.listaSala = req.params.id
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
                            res.render( render[ 5 ], {
                                user: req.user,
                                page_name: req.path,
                                accountType: req.user.tipo,
                                accountId: req.user.id,
                                idSala: req.listaSala
                            } );
                        else
                            res.send( '<h1>Você não é responsável pela - ' + turma.nome + '</>' );

                    } else
                        next();
                } );
                conexaoDb.end();
            }
        },

        abrirAluno: function ( req, res, next ) {
            let id = req.params.id;
            var usuario = req.user;

            if ( usuario.tipo === "professor" ) {

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.buscarSala( id, function ( err, resultado ) {
                    if ( !err && resultado.length != 0 ) {
                        let turma = resultado[ 0 ];
                        if ( turma.id_professor == usuario.id )
                            res.render( render[ 6 ], {
                                user: req.user,
                                page_name: req.path,
                                accountType: req.user.tipo,
                                accountId: req.user.id,
                                idSala: req.listaSala
                            } );
                        else
                            res.send( '<h1>Você não é responsável pela - ' + turma.nome + '</>' );

                    } else
                        next();
                } );
                conexaoDb.end();
            }
        }
    };


    professorController.exercicios = {
        get: function ( req, res ) {
            res.render( render[ 7 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };


    professorController.criarExercicios = {
        get: function ( req, res ) {
            res.render( render[ 8 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };


    professorController.listaExercicios = {
        get: function ( req, res ) {
            res.render( render[ 9 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };


    professorController.criarListaExercicios = {
        get: function ( req, res ) {
            res.render( render[ 10 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };
    return professorController;
};
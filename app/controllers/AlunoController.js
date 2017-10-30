module.exports = function ( app ) {
    var passport = app.get( 'passport' );

    var paths = [
/*00*/  'aluno/signup',
/*01*/  'aluno/login',
/*02*/  'aluno/perfil/perfil',
/*03*/  'aluno/perfil/turmas',
/*04*/  'aluno/perfil/turmasProfessor',
/*05*/  'aluno/perfil/turmasProcurar',
/*06*/  'aluno/perfil/atualizarPerfil'
    ];
    var redirect = [
/*00*/  '/aluno/login',
/*01*/  '/profile',
/*02*/  '/aluno/login',
/*03*/  '/profile/turmas'
    ];

    alunoController = {};

    /**
     * Cadastro
     */
    alunoController.cadastro = {
        get: function ( req, res ) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( exception, resultado ) {
                res.render( paths[ 0 ], {
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

            usuarioDAO.salvarAluno( usuario, function ( erro, resultado ) {
                res.redirect( redirect[ 0 ] );
            } );
            conexaoDb.end();
        }
    };

    /**
     * Login
     */
    alunoController.login = {
        get: function ( req, res ) {
            res.render( paths[ 1 ], { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-aluno', {
            successRedirect: redirect[ 1 ],
            failureRedirect: redirect[ 2 ],
            failureFlash: true
        } )
    };

    alunoController.perfil = {
        get: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {
                res.render( paths[ 2 ], {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            }
        },
        update: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {
                res.render( paths[ 6 ], {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            }
        }
    };

    /**
     *Turmas
     */
    alunoController.minhasTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaAluno( req.user.id, function ( err, resultadoAluno ) {
                    res.render( paths[ 3 ], {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        listaSalaAluno: resultadoAluno

                    } );
                } );
                conexaoDb.end();
            }
        },
        post: function ( req, res ) {
            res.send( '<h1>Turma Aluno</h1>' );
        }
    };

    alunoController.turmasProfessor = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                idDoProfessor = req.params.id;

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaProfessor( idDoProfessor, function ( err, resultado ) {
                    res.render( paths[ 4 ], {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        listaSala: resultado
                    } );
                } );

                conexaoDb.end();
            } else { res.status( 403 ); }
        },

        post: function ( req, res ) {
            var id_sala = Object.keys( req.body )[ 0 ];
            var id_aluno = req.user.id;

            var conexaoDb = app.infra.banco.dbConnection();
            var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

            salaDAO.alunoEntrarTurma( id_aluno, id_sala, function ( err, resultado ) {
                res.redirect( redirect[ 3 ] );

            } );

            conexaoDb.end();
        }
    };

    alunoController.procurarTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                var conexaoDb = app.infra.banco.dbConnection();
                var usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

                usuarioDAO.listaProfessor( function ( err, resultado ) {
                    res.render( paths[ 5 ], {
                        user: req.user,
                        page_name: req.path,
                        accountType: req.user.tipo,
                        listaSalaProfessor: resultado
                    } );
                } );

                conexaoDb.end();
            }
        }
    };

    return alunoController;

};
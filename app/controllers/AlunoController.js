module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    alunoController = {};

    /**
     * Cadastro
     */
    alunoController.cadastro = {
        get: function ( req, res ) {
            var conexaoDb = app.infra.banco.dbConnection();
            var instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( exception, resultado ) {
                res.render( 'aluno/signup', {
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
                res.redirect( '/aluno/login' );
            } );
            conexaoDb.end();
        }
    };

    /**
     * Login
     */
    alunoController.login = {
        get: function ( req, res ) {
            res.render( 'aluno/login', { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-aluno', {
            successRedirect: '/profile',
            failureRedirect: '/aluno/login',
            failureFlash: true
        } )
    };

    alunoController.perfil = {
        get: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {
                res.render( 'aluno/perfil/perfil', {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                } );
            }
        },
        update: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {
                res.render( 'aluno/perfil/atualizarPerfil', {
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
                    res.render( 'aluno/perfil/turmas', {
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
                    res.render( 'aluno/perfil/turmas', {
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
                res.redirect( '/profile/turmas' );

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
                    res.render( 'aluno/perfil/turmasProcurar', {
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
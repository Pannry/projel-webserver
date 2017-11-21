module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    Aluno = {};

    /**
     *  Turmas
    */
    Aluno.minhasTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaAluno( entrada, function ( err, resultadoAluno ) {
                    ejs.listaSalaAluno = resultadoAluno;
                    res.render( 'aluno/perfil/turmas/minhasTurmas', ejs );
                } );

                conexaoDb.end();
            }
        },

        post: function ( req, res ) {
            res.send( '<h1>Turma Aluno</h1>' );
        }
    };


    Aluno.abrirTurma = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                }

                res.render( 'aluno/perfil/turmas/abrirTurma', ejs );

            }
        }
    };


    Aluno.procurarTurmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

                usuarioDAO.listaProfessor( function ( err, resultado ) {
                    ejs.listaSalaProfessor = resultado;
                    res.render( 'aluno/perfil/turmas/selecionarProfessor', ejs );
                } );

                conexaoDb.end();
            }
        }
    };


    Aluno.turmasProfessor = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let entrada = req.params.id;
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaProfessor( entrada, function ( err, resultado ) {
                    ejs.listaSalaAluno = resultado;
                    res.render( 'aluno/perfil/turmas/professorTurmas', ejs );
                } );

                conexaoDb.end();
            } else
                res.status( 403 );
        },

        post: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let entrada = {
                    id_sala: Object.keys( req.body )[ 0 ],
                    id_aluno: req.user.id
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.alunoEntrarTurma( entrada, function ( err ) {
                    res.redirect( '/profile/turmas' );

                } );

                conexaoDb.end();

            } else
                res.status( 403 );
        }
    };

    return Aluno;
};

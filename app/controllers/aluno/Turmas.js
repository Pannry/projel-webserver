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

                let entrada1 = req.params.id;
                let entrada2 = {
                    id_aluno: req.user.id,
                }
                let entrada3 = req.params.id;


                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb1 = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb1 );

                //Informações da sala
                salaDAO.buscarSala( entrada1, function ( err, resultado1 ) {
                    ejs.sala = resultado1;
                    entrada2.id_sala = resultado1[ 0 ].id;

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let salaDAO = new app.infra.banco.SalaDAO( conexaoDb2 );

                    salaDAO.verificarAutenticacao( entrada2, function ( err, resultado2 ) {
                        ejs.aluno_aceito = resultado2[ 0 ].aluno_aceito;

                        let conexaoDb3 = app.infra.banco.dbConnection();
                        let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb3 );

                        ExerciciosDao.mostrarListasAluno( entrada3, function ( err, resultado3 ) {
                            ejs.lista = resultado3;

                            res.render( 'aluno/perfil/turmas/abrirTurma', ejs );
                        } );
                        conexaoDb3.end();
                    } );
                    conexaoDb2.end();
                } );
                conexaoDb1.end();
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

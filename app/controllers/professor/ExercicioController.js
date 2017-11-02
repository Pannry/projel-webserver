module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    exercicioController = {};

    exercicioController.exercicios = {
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

    exercicioController.criarExercicios = {
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

    exercicioController.abrirExercicio = {
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

    exercicioController.listaExercicios = {
        get: function ( req, res ) {
            res.render( 'professor/perfil/exercicios/listaExercicios', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };

    exercicioController.criarListaExercicios = {
        get: function ( req, res ) {
            res.render( 'professor/perfil/exercicios/criarListaExercicios', {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };

    return exercicioController;
}

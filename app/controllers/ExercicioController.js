module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    exercicioController = {};

    exercicioController.criarExercicios = {

        get: function ( req, res, next ) {
            if ( req.user.tipo == 'professor' ) {
                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( id_professor, function ( resultado, err ) {
                    if ( !err ) {
                        console.log( resultado );
                        res.render( render[ 8 ], {
                            user: req.user,
                            page_name: req.path,
                            accountType: req.user.tipo
                        } );

                    } else
                        next()
                } )


            }

        }, post: function ( req, res, next ) {
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

    exercicioController.listaExercicios = {
        get: function ( req, res ) {
            res.render( render[ 9 ], {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo
            } );
        }
    };

    return exercicioController;
}

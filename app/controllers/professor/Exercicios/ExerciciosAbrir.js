module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    /**
     *      Exercicios
     */

    Exercicios = {
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

    return Exercicios;
}

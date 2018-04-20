module.exports = function ( app ) {
    Exercicios = {
        get: ( req, res, next ) => {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( entrada, ( err, resultado ) => {
                    ejs.listaExercicios = resultado;

                    if ( !err )
                        res.render( 'professor/perfil/exercicios/exercicios', ejs );
                    else
                        next();

                } );
                conexaoDb.end();

            };
        }
    };

    return Exercicios;
}

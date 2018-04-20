module.exports = function ( app ) {
    Exercicios = {
        delete: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {
                let entrada = req.params.id;

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.excluirLista( entrada, ( err, results ) => {
                    res.redirect( '/professor/profile/exercicios/lista' );
                } );
                conexaoDb.end();
            }
        }
    };

    return Exercicios;
}

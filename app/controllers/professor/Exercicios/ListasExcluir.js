module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    Exercicios = {
        delete: function ( req, res ) {
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

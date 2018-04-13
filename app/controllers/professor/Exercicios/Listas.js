module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    Exercicios = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarListaExercicios( entrada, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/lista', ejs );

                } );
                conexaoDb.end();

            }
        }
    };

    return Exercicios;
}

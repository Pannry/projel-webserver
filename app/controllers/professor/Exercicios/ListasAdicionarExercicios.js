module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Exercicios = {};

    Exercicios = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    user_id: req.user.id,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    id_lista: req.params.id
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.listarExercicios( entrada, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/adicionarExercicios', ejs );

                } );
                conexaoDb.end();

            }
        },

        post: function ( req, res ) {

            let entrada = {
                id_lista: req.params.id
            }

            let checkbox = req.body.options;
            let vetor = [];

            for ( let i = 0; i < checkbox.length; i++ ) vetor[ i ] = checkbox[ i ];

            vetor.forEach( element => {
                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                entrada.id_exercicios = element;
                ExerciciosDao.adicionarExercicioLista( entrada, ( err ) => { } );

                conexaoDb.end();
            } );

            res.redirect( '/professor/profile/exercicios/lista' );

        }
    };

    return Exercicios;
}

module.exports = function ( app ) {
    Exercicios = {
        get: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/exercicios/criarLista', ejs );

            }
        },
        post: ( req, res ) => {

            let entrada = {
                id_professor: req.user.id,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                tipo: req.body.tipoDeLista
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.criarListaExercicios( entrada, ( err, resultado ) => {
                if ( !err )
                    res.redirect( '/professor/exercicios/lista/abrir/' + resultado.insertId + "/editar" );
                else
                    next();

            } );
            conexaoDb.end();

        }
    };

    return Exercicios;
}

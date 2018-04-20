module.exports = function ( app ) {
    Exercicios = {
        mostrarInformacoes: ( req, res ) => {

            let entrada = {
                id_professor: req.user.id,
                id: req.params.id
            };

            let ejs = {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo,
                id: req.params.id
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.abrirLista( entrada, ( err, resultado ) => {
                if ( resultado.length == 0 ) res.render( 'erro/403', ejs );
                else {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/exercicios/abrirListaInfo', ejs );
                }

            } );

            conexaoDb.end();
        },

        mostrarQuestoes: ( req, res ) => {

            let entrada = {
                id_lista: req.params.id
            };

            let ejs = {
                user: req.user,
                page_name: req.path,
                accountType: req.user.tipo,
                id: req.params.id
            }

            let conexaoDb = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

            ExerciciosDao.mostrarQuestoes( entrada, ( err, resultado ) => {
                ejs.exercicios = resultado;
                res.render( 'professor/perfil/exercicios/abrirListaExercicios', ejs );

            } );
            conexaoDb.end();

        }
    };

    return Exercicios;
}

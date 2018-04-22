module.exports = function ( app ) {
    turmas = {
        get: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {

                let id_professor = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.mostrarListaExercicios( id_professor, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/turmas/listarListaParaAdicionar', ejs );

                } );
                conexaoDb.end();

            }
        },

        post: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {
                let entrada = {
                    id_sala: req.params.id,
                }

                let checkbox = req.body.options;
                let listas = [];

                if ( !Array.isArray( checkbox ) )
                    listas = Array.of( checkbox );
                else
                    listas = checkbox;

                var conexaoDb = app.infra.banco.dbConnection();
                var ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                listas.forEach( element => {
                    entrada.id_lista = element;
                    ExerciciosDao.listasParaIncluir( entrada, ( err, resultado ) => { } );
                } );
                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' );
            }
        }
    }
    return turmas;
};
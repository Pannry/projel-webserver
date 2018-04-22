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
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                didaticoDAO.mostrarListaDidaticos( id_professor, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/turmas/listarDidaticoParaAdicionar', ejs );

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
                let materiais = [];

                if ( !Array.isArray( checkbox ) )
                    materiais = Array.of( checkbox );
                else
                    materiais = checkbox;

                var conexaoDb = app.infra.banco.dbConnection();
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                materiais.forEach( element => {
                    entrada.id_didatico = element
                    didaticoDAO.didaticoParaIncluir( entrada, ( err, resultado ) => { } );
                } );
                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' );
            }
        }

    }

    return turmas;
};
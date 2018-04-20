module.exports = function ( app ) {
    Didatico = {
        get: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {
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
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.abrirDidatico( entrada, ( err, resultado ) => {
                    if ( resultado.length == 0 ) res.render( 'erro/403', ejs );
                    else {

                        ejs.conteudo = resultado;
                        let entrada2 = resultado[ 0 ].id;

                        let conexaoDb2 = app.infra.banco.dbConnection();
                        let DidaticoDAO2 = new app.infra.banco.DidaticoDAO( conexaoDb2 );

                        DidaticoDAO2.arquivosDownload( entrada2, ( err, resultado2 ) => {
                            ejs.paths = resultado2;
                            res.render( 'professor/perfil/didatico/abrirDidatico', ejs );
                        } );
                        conexaoDb2.end();

                    }
                } );
                conexaoDb.end();

            };
        }
    }

    return Didatico;
};
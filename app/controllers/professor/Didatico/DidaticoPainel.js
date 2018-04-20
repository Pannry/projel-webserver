module.exports = function ( app ) {
    Didatico = {
        get: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.listarDidatico( entrada, ( err, resultado ) => {
                    ejs.listaDidatico = resultado;

                    if ( !err )
                        res.render( 'professor/perfil/didatico/didatico', ejs );
                    else
                        next();

                } );
                conexaoDb.end();

            };
        }
    }

    return Didatico;
};
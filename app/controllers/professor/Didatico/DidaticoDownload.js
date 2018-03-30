module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Didatico = {};

    Didatico = {
        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {

                entrada = {
                    id_professor: req.user.id,
                    id: req.params.id,
                    file_name: req.params.path
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.fazerDownload( entrada, ( err, resultado ) => {
                    if ( resultado.length == 0 )
                        res.render( 'erro/403', ejs );
                    else
                        res.download( 'app/uploads/' + resultado[ 0 ].file_name );
                } );
                conexaoDb.end();
            };
        }
    }

    return Didatico;
};
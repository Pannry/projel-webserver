module.exports = function ( app ) {
    let passport = app.get( 'passport' );
    const fs = require( 'fs' );

    Didatico = {};

    Didatico = {
        delete: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                let entrada = req.params.id;

                let conexaoDb = app.infra.banco.dbConnection();
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.arquivosDownload( entrada, ( err, results ) => {

                    results.forEach( file => {
                        let path = 'app/uploads/';
                        fs.unlink( path + file.file_name, ( err ) => { } );
                    } );

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let DidaticoDAO2 = new app.infra.banco.DidaticoDAO( conexaoDb2 );

                    DidaticoDAO2.excluirDidatico( entrada, ( err, results ) => {
                        res.redirect( '/professor/profile/didatico' );
                    } );
                    conexaoDb2.end();

                } );
                conexaoDb.end();


            };
        }
    }

    return Didatico;
};
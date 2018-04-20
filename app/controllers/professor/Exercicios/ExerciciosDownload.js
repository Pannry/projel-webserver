module.exports = function ( app ) {
    Exercicios = {
        get: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    id: req.params.id,
                    file_name: req.params.path,
                    id_professor: req.user.id
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.fazerDownload( entrada, ( err, resultado ) => {
                    if ( resultado.length == 0 )
                        res.render( 'erro/403', ejs );
                    else {
                        res.download( 'app/uploads/' + resultado[ 0 ].file_name );
                    }
                } );
                conexaoDb.end();


            };
        }
    }

    return Exercicios;
}

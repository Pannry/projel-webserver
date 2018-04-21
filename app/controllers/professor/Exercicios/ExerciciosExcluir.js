module.exports = function ( app ) {
    const fs = require( 'fs' );

    Exercicios = {
        delete: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {
                let entrada = req.params.id;

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.arquivosDownload( entrada, ( err, results ) => {

                    results.forEach( file => {
                        let path = 'app/uploads/';
                        fs.unlink( path + file.file_name, ( err ) => { } );
                    } );

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let ExerciciosDao2 = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    ExerciciosDao2.excluirExercicio( entrada, ( err, results ) => {
                        res.redirect( '/professor/profile/exercicios' );
                    } );
                    conexaoDb2.end();

                } );
                conexaoDb.end();
            };
        }
    };

    return Exercicios;
}

module.exports = function ( app ) {
    let passport = app.get( 'passport' );
    const fs = require( 'fs' );

    Exercicios = {};

    Exercicios = {
        delete: function ( req, res ) {
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
                        console.log( entrada, results );
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

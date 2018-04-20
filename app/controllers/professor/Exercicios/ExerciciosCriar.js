module.exports = function ( app ) {
    Exercicios = {
        get: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }
                res.render( 'professor/perfil/exercicios/criarExercicios', ejs );
            };
        },

        post: ( req, res, next ) => {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    id_professor: req.user.id,
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let ExerciciosDao = new app.infra.banco.ExerciciosDao( conexaoDb );

                ExerciciosDao.criarExercicios( entrada, ( err, results ) => {
                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let ExerciciosDao2 = new app.infra.banco.ExerciciosDao( conexaoDb2 );

                    req.files.forEach( element => {
                        let entrada2 = {
                            id: results.insertId, // retorna a PRIMARY KEY do INSERT anterior
                            file_name: element.filename
                        }
                        ExerciciosDao2.adicionarMaterial( entrada2, ( err ) => { } );
                    } );

                    conexaoDb2.end();

                    if ( !err )
                        res.redirect( '/professor/profile/exercicios' );
                    else
                        next();
                } );
                conexaoDb.end();

            }
        }
    };

    return Exercicios;
}

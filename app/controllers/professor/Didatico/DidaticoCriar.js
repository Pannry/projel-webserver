module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Didatico = {};

    Didatico = {
        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }
                res.render( 'professor/perfil/didatico/criarDidatico', ejs );
            };
        },

        post: function ( req, res, next ) {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    id_professor: req.user.id,
                    titulo: req.body.titulo,
                    descricao: req.body.descricao,
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.criarDidatico( entrada, ( err, results ) => {
                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let DidaticoDAO2 = new app.infra.banco.DidaticoDAO( conexaoDb2 );

                    req.files.forEach( element => {
                        let entrada2 = {
                            id: results.insertId, // retorna a PRIMARY KEY do INSERT anterior
                            file_name: element.filename
                        }
                        DidaticoDAO2.adicionarMaterial( entrada2, ( err ) => { } );
                    } );

                    conexaoDb2.end();
                    res.redirect( '/professor/profile/didatico' );
                } );
                conexaoDb.end();
            };
        }
    }

    return Didatico;
};
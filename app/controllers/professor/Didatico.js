module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Didatico = {};

    Didatico.painelDidatico = {

        get: function ( req, res ) {
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

    Didatico.criarDidatico = {
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
                        console.log( element );

                        let entrada2 = {
                            id: results.insertId, // retorna a PRIMARY KEY do INSERT anterior
                            file_name: element.filename,
                            file_path: element.path
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


    Didatico.abrirDidatico = {

        get: function ( req, res ) {
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
                            if ( err ) console.log( err );
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

    // FIXME: 
    /*
        [] deletar coluna file_path
        [] mais algumas coisas q n lembro.....
    */
    Didatico.downloadDidatico = {
        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                console.log( req.params );
                res.download( 'app/uploads/' + req.params.path );
            };
        }
    }

    return Didatico;
};
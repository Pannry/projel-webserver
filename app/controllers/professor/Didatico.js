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
                    download: ''
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let DidaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                DidaticoDAO.criarDidatico( entrada, ( err ) => {
                    if ( !err )
                        res.redirect( '/professor/profile/didatico' );
                    else
                        next();
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
                        res.render( 'professor/perfil/didatico/abrirDidatico', ejs );
                    }

                } );
                conexaoDb.end();

            };
        }
    }

    return Didatico;
};
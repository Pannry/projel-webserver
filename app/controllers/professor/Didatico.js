module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    didatico = {};

    didatico.painelDidatico = {

        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/didatico/didatico', ejs );

            };
        }
    }

    didatico.criarDidatico = {

        get: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/didatico/criarDidatico', ejs );

            };
        }
    }

    return didatico;
};
module.exports = function ( app ) {
    let passport = app.get( 'passport' );
    let bcrypt = require( 'bcrypt' );
    const saltRounds = 7;

    Professor = {};

    Professor = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let params = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/perfil', params );
            }
        },

        update: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let params = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/atualizarPerfil', params );
            }
        }
    };

    return Professor;
};
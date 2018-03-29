module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Professor = {};

    Professor = {
        get: function ( req, res ) {
            res.render( 'professor/login', { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-professor', {
            successRedirect: '/professor/profile',
            failureRedirect: '/professor/login',
            failureFlash: true
        } )
    };


    return Professor;
};
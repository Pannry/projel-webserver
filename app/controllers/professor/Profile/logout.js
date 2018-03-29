module.exports = function ( app ) {
    let passport = app.get( 'passport' );
    let bcrypt = require( 'bcrypt' );
    const saltRounds = 7;

    Professor = {};

    Professor.logout = function ( req, res ) {
        req.logout();
        res.redirect( '/' );
    };

    return Professor;
};
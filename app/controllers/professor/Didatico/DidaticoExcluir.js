module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Didatico = {};

    Didatico = {
        delete: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                console.log( 'Deleted message' );
                res.redirect( '/professor/profile/didatico' );
            };
        }
    }

    return Didatico;
};
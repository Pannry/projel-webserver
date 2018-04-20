module.exports = function ( app ) {
    Professor.logout = ( req, res ) => {
        req.logout();
        res.redirect( '/' );
    };

    return Professor;
};
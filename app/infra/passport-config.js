var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app) {
    var passport = app.get('passport');
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            return done(null, {
                id: 1,
                user: 'Thales',
                password: 'dajdioajdioasjdoaisjdia'
            });
        }
    ));
}


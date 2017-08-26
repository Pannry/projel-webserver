var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');


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
            var conexaoDb = app.infra.banco.dbConnection();
            var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

            password = bcrypt.hashSync(password, null, null);

            usuarioDAO.buscar(
                {
                    email: username,
                    senha: password
                },
                function (exceptions, usuario) {
                    if (exceptions) return done(exceptions);
                    if (!usuario)
                        return done(null, false, { message: 'Usuario não encontrado' });
                    return done(null, usuario);
                }
            );
        }
    ));
}


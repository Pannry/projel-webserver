var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');


module.exports = function (app) {
    var passport = app.get('passport');

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.buscarId(id, function (err, usuario) {
            done(err, usuario[0]);
        });
        conexaoDb.end();
    });

    // Quando é feito o login, a estrategia é chamada antes da local-stategy
    // após terminar a autenticação, o programa chama o .serializeUser()
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function (req, username, password, done) {
        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);
        // password = bcrypt.hashSync(password, null, null);
        var usuario = {
            email: username,
            senha: password
        };

        usuarioDAO.buscarAluno(usuario,
            function (err, usuario) {
                if (err)
                    return done(err);
                if (!usuario)
                    return done(null, false, { message: 'Usuario não encontrado' });

                return done(null, usuario[0]);
            }
        );
        conexaoDb.end();
    }
    ));
}


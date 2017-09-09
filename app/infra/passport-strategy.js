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

        if ( app.get('isAluno') === 'true' ) {
            usuarioDAO.buscarIdAluno(id, function (err, usuario) {
                done(err, usuario[0]);
            });
        } else if(  app.get('isProfessor') === 'true' ) {     
            usuarioDAO.buscarIdProfessor(id, function (err, usuario) {
                done(err, usuario[0]);
            });
        }


        conexaoDb.end();
    });

    /**
     * Login do Aluno
     */
    passport.use('local-login-aluno', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function (req, username, password, done) {

        app.set('isProfessor', 'false');
        app.set('isAluno', 'true');

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

    /**
     * Login do professor
     */
    passport.use('local-login-professor', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function (req, username, password, done) {

        app.set('isProfessor', 'true');
        app.set('isAluno', 'false');

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);
        // password = bcrypt.hashSync(password, null, null);
        var usuario = {
            email: username,
            senha: password
        };

        usuarioDAO.buscarProfessor(usuario,
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

// sites relacionados com multiplas 'local-strategy' 

// https://stackoverflow.com/questions/40411236/authorization-for-multiple-local-strategies-in-passportjs-using-mongodb-and-node
// https://stackoverflow.com/questions/36102524/passport-js-multiple-local-strategies-and-req-user
// https://stackoverflow.com/questions/20052617/use-multiple-local-strategies-in-passportjs
// https://github.com/jaredhanson/passport/issues/50
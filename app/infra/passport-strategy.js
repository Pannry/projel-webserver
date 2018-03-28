module.exports = function ( app ) {
    var LocalStrategy = require( 'passport-local' ).Strategy;
    var bcrypt = require( 'bcrypt' );
    var passport = app.get( 'passport' );

    passport.serializeUser( function ( user, done ) {
        var chave = {
            id: user.id,
            tipo: user.tipo
        }
        done( null, chave );
    } );

    passport.deserializeUser( function ( usuario, done ) {

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

        if ( usuario.tipo === 'aluno' ) {
            usuarioDAO.buscarIdAluno( usuario.id, function ( err, usuario ) {
                usuario[ 0 ].tipo = 'aluno';
                done( err, usuario[ 0 ] );
            } );
        } else if ( usuario.tipo === 'professor' ) {
            usuarioDAO.buscarIdProfessor( usuario.id, function ( err, usuario ) {
                usuario[ 0 ].tipo = 'professor';
                done( err, usuario[ 0 ] );
            } );
        }

        conexaoDb.end();
    } );

    /**
     * Login do Aluno
     */
    passport.use( 'local-login-aluno', new LocalStrategy( {
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function ( req, username, password, done ) {

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

        var entrada = {
            email: username,
            senha: password
        };

        usuarioDAO.buscarAluno( entrada, ( err, usuario ) => {

            if ( err )
                return done( err );
            if ( !usuario.length )
                return done( null, false, req.flash( 'loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.' ) );
            if ( !bcrypt.compareSync( entrada.senha, usuario[ 0 ].senha ) )
                return done( null, false, req.flash( 'loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.' ) );

            usuario[ 0 ].tipo = "aluno";
            return done( null, usuario[ 0 ] );
        } );

        conexaoDb.end();
    } ) );

    /**
     * Login do professor
     */
    passport.use( 'local-login-professor', new LocalStrategy( {
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function ( req, username, password, done ) {

        var conexaoDb = app.infra.banco.dbConnection();
        var usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

        var entrada = {
            email: username,
            senha: password
        };

        usuarioDAO.buscarProfessor( entrada, ( err, usuario ) => {
            if ( err )
                return done( err );
            if ( !usuario.length )
                return done( null, false, req.flash( 'loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.' ) );
            if ( !bcrypt.compareSync( entrada.senha, usuario[ 0 ].senha ) )
                return done( null, false, req.flash( 'loginMessage', 'Oops! Email ou senha não encontrado, tente novamente.' ) );

            usuario[ 0 ].tipo = 'professor';
            return done( null, usuario[ 0 ] );
        } );

        conexaoDb.end();
    } ) );
}

// sites relacionados com multiplas 'local-strategy' 

// https://stackoverflow.com/questions/40411236/authorization-for-multiple-local-strategies-in-passportjs-using-mongodb-and-node
// https://stackoverflow.com/questions/36102524/passport-js-multiple-local-strategies-and-req-user
// https://stackoverflow.com/questions/20052617/use-multiple-local-strategies-in-passportjs
// https://github.com/jaredhanson/passport/issues/50
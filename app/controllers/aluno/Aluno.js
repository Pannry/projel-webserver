// Modelo de midware

// function ( req, res ) {
//     if ( req.user.tipo == 'aluno' ) {

//methods...


//     } else
//         res.status( 403 );

module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    Aluno = {};

    /**
     * Cadastro
     */
    Aluno.cadastro = {
        get: function ( req, res ) {

            let ejs = {};

            let conexaoDb = app.infra.banco.dbConnection();
            let instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( err, resultado ) {
                ejs.listaDeInstituicao = resultado;
                res.render( 'aluno/signup', ejs );
            } );

            conexaoDb.end();
        },

        post: function ( req, res ) {
            let entrada = req.body;
            // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

            let conexaoDb = app.infra.banco.dbConnection();
            let usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

            usuarioDAO.salvarAluno( entrada, function ( err ) {
                res.redirect( '/aluno/login' );
            } );
            conexaoDb.end();
        }
    };

    /**
     * Login
     */
    Aluno.login = {
        get: function ( req, res ) {
            res.render( 'aluno/login', { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-aluno', {
            successRedirect: '/profile',
            failureRedirect: '/aluno/login',
            failureFlash: true
        } )
    };


    Aluno.perfil = {
        get: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                };

                res.render( 'aluno/perfil/perfil', ejs );
            }
        },

        update: function ( req, res ) {
            if ( req.user.tipo == "aluno" ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                };

                res.render( 'aluno/perfil/atualizarPerfil', ejs );

            }
        }
    };

    return Aluno;
};

module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    Professor = {};

    Professor.cadastro = {
        get: function ( req, res ) {

            let params = {}

            let conexaoDb = app.infra.banco.dbConnection();
            let instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( function ( err, resultado ) {
                params.listaDeInstituicao = resultado;
                res.render( 'professor/signup', params );
            } );

            conexaoDb.end();

        },

        post: function ( req, res ) {
            let entrada = req.body;

            // usuario.senha = bcrypt.hashSync(usuario.senha, null, null);

            let conexaoDb = app.infra.banco.dbConnection();
            let usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

            usuarioDAO.salvarProfessor( entrada, function ( err, resultado ) {
                res.redirect( '/professor/login' );
            } );
            conexaoDb.end();
        }
    };


    Professor.login = {
        get: function ( req, res ) {
            res.render( 'professor/login', { message: req.flash( 'loginMessage' ) } );
        },

        post: passport.authenticate( 'local-login-professor', {
            successRedirect: '/professor/profile',
            failureRedirect: '/professor/login',
            failureFlash: true
        } )
    };


    Professor.logout = function ( req, res ) {
        req.logout();
        res.redirect( '/' );
    };


    Professor.perfil = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let params = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/perfil', params );
            }
        },

        update: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let params = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                res.render( 'professor/perfil/atualizarPerfil', params );
            }
        },
    };




    return Professor;
};
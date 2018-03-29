module.exports = function ( app ) {
    let passport = app.get( 'passport' );
    let bcrypt = require( 'bcrypt' );
    const saltRounds = 7;

    Professor = {};

    Professor = {
        get: function ( req, res ) {

            let params = {}

            let conexaoDb = app.infra.banco.dbConnection();
            let instituicaoDAO = new app.infra.banco.InstituicaoDAO( conexaoDb );

            instituicaoDAO.listaInstituicao( ( err, resultado ) => {
                params.listaDeInstituicao = resultado;
                res.render( 'professor/signup', params );
            } );

            conexaoDb.end();

        },

        post: function ( req, res ) {
            let entrada = req.body;

            entrada.senha = bcrypt.hashSync( entrada.senha, saltRounds );

            let conexaoDb = app.infra.banco.dbConnection();
            let usuarioDAO = new app.infra.banco.UsuarioDAO( conexaoDb );

            usuarioDAO.salvarProfessor( entrada, ( err, resultado ) => {
                res.redirect( '/professor/login' );
            } );
            conexaoDb.end();
        }
    };
    return Professor;
};
module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    turmas = {};

    turmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                }

                res.render( 'professor/perfil/turmas/criarTurma', ejs );
            }
        },

        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let entrada = {
                    nome: req.body.nome,
                    semestre: req.body.semestre,
                    id_professor: req.user.id,
                    comentario: ''
                };

                let conexaoDb = app.infra.banco.dbConnection();
                let salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.addSala( entrada, ( err ) => {
                    res.redirect( '/professor/profile/turmas' );
                } );

                conexaoDb.end();
            }
        }
    };

    return turmas;
};
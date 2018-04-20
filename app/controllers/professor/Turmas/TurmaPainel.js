module.exports = function ( app ) {
    turmas = {
        get: ( req, res ) => {
            if ( req.user.tipo == 'professor' ) {

                let entrada = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var salaDAO = new app.infra.banco.SalaDAO( conexaoDb );

                salaDAO.listaSalaProfessor( entrada, ( err, resultado ) => {
                    ejs.listaSala = resultado;
                    res.render( 'professor/perfil/turmas/turmas', ejs );
                } );

                conexaoDb.end();
            }
        }
    };

    return turmas;
};
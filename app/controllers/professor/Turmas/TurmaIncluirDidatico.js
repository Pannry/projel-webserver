module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    turmas = {};

    turmas = {
        get: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {

                let id_professor = req.user.id;

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    idSala: req.params.id
                }

                var conexaoDb = app.infra.banco.dbConnection();
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                didaticoDAO.mostrarListaDidaticos( id_professor, ( err, resultado ) => {
                    ejs.lista = resultado;
                    res.render( 'professor/perfil/turmas/listarDidaticoParaAdicionar', ejs );

                } );
                conexaoDb.end();

            }
        },
        post: function ( req, res ) {
            if ( req.user.tipo == 'professor' ) {
                let entrada = {}
                entrada.id_sala = req.params.id;

                let checkbox = req.body.options;
                let vetor = [];

                for ( let i = 0; i < checkbox.length; i++ )
                    vetor[ i ] = checkbox[ i ];

                var conexaoDb = app.infra.banco.dbConnection();
                var didaticoDAO = new app.infra.banco.DidaticoDAO( conexaoDb );

                vetor.forEach( element => {
                    entrada.id_didatico = element
                    didaticoDAO.didaticoParaIncluir( entrada, ( err, resultado ) => { } );

                } );

                conexaoDb.end();

                res.redirect( '/professor/turma/abrir/' + entrada.id_sala + '/aluno' )
            }
        }

    }

    return turmas;
};
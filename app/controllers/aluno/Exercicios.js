


module.exports = function ( app ) {
    var passport = app.get( 'passport' );
    Exercicios = {};

    Exercicios.lista = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let entrada = {
                    id_sala: req.params.id_sala,
                    id_lista: req.params.id_lista
                }

                res.render( 'aluno/perfil/exercicios/abrirListaAluno.ejs', ejs );

            } else
                res.status( 403 );
        }
    }


    Exercicios.responderExercicio = {

        get: function ( req, res ) {
            if ( req.user.tipo == 'aluno' ) {

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let entrada = {
                    id_sala: req.params.id_sala,
                    id_lista: req.params.id_lista
                }

                res.render( 'aluno/perfil/exercicios/responderExercicio.ejs', ejs );

            } else
                res.status( 403 );
        }
    }

    return Exercicios;
};

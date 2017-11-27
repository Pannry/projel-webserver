module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    notas = {};

    notas.abrir = {

        professorGET: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    sala: req.params.id_sala,
                    aluno: req.params.id_aluno
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb1 = app.infra.banco.dbConnection();
                let NotasDAO1 = new app.infra.banco.NotasDAO( conexaoDb1 );

                NotasDAO1.selecionarListas( entrada.sala, ( err, resultado1 ) => {
                    ejs.lista = resultado1;

                    res.render( 'professor/perfil/notas/AbrirNotasAluno', ejs );
                } );

                conexaoDb1.end();

            };
        }
        // ,{ }
    }

    return notas;
};
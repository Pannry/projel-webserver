module.exports = function ( app ) {
    let passport = app.get( 'passport' );

    notas = {};

    notas.abrir = {

        professorGET: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno
                }

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno
                }

                let conexaoDb1 = app.infra.banco.dbConnection();
                let NotasDAO1 = new app.infra.banco.NotasDAO( conexaoDb1 );

                NotasDAO1.selecionarListas( entrada.id_sala, ( err, resultado1 ) => {
                    ejs.lista = resultado1;

                    res.render( 'professor/perfil/notas/AbrirNotasAluno', ejs );

                } );
                conexaoDb1.end();
            };
        },

        post: function ( req, res ) {
            if ( req.user.tipo === "professor" ) {
                entrada = {
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno,
                    id_lista: req.params.id_lista
                }
                ejs = {
                    sala: req.params.id_sala,
                    aluno: req.params.id_aluno,
                    nota: req.body.nota
                }

                entrada.nota = req.body.nota;

                let conexaoDb1 = app.infra.banco.dbConnection();
                let NotasDAO1 = new app.infra.banco.NotasDAO( conexaoDb1 );

                NotasDAO1.criarNotaAlunoSala( entrada, ( err, resultado1 ) => {
                    res.redirect( '/professor/turma/abrir/' + ejs.sala + '/professor/' + ejs.aluno );
                } );

                conexaoDb1.end();

            };
        }
    }

    return notas;
};
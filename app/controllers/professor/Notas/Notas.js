module.exports = function ( app ) {
    notas = {
        professorGET: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {

                let entrada = {
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno
                };

                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo,
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno
                };

                let conexaoDb1 = app.infra.banco.dbConnection();
                let NotasDAO1 = new app.infra.banco.NotasDAO( conexaoDb1 );

                NotasDAO1.selecionarListas( entrada.id_sala, ( err, resultado1 ) => {
                    ejs.lista = resultado1;

                    ejs.lista.forEach( element => {
                        let criarNotas = entrada;
                        criarNotas.id_lista = element.id_lista;

                        let conexaoDb3 = app.infra.banco.dbConnection();
                        let NotasDAO3 = new app.infra.banco.NotasDAO( conexaoDb3 );

                        NotasDAO3.criarNotaAlunoSala( criarNotas, ( err, resultado2 ) => { } );

                        conexaoDb3.end();
                    } );

                    let conexaoDb2 = app.infra.banco.dbConnection();
                    let NotasDAO2 = new app.infra.banco.NotasDAO( conexaoDb2 );

                    NotasDAO2.mostrarNotaAlunoSala( entrada, ( err, resultado2 ) => {
                        ejs.notas = resultado2;
                        res.render( 'professor/perfil/notas/AbrirNotasAluno', ejs );
                    } );
                    conexaoDb2.end();


                } );
                conexaoDb1.end();
            };
        },

        post: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {
                let entrada = {
                    id_sala: req.params.id_sala,
                    id_aluno: req.params.id_aluno,
                    id_lista: req.params.id_lista
                }
                let ejs = {
                    sala: req.params.id_sala,
                    aluno: req.params.id_aluno,
                    nota: req.body.nota
                }

                entrada.nota = req.body.nota;

                let conexaoDb1 = app.infra.banco.dbConnection();
                let NotasDAO1 = new app.infra.banco.NotasDAO( conexaoDb1 );

                NotasDAO1.atualizarNota( entrada, ( err, resultado1 ) => {
                    res.redirect( '/professor/turma/abrir/' + ejs.sala + '/professor/' + ejs.aluno );
                } );

                conexaoDb1.end();

            };
        },

        verRespostas: ( req, res ) => {
            if ( req.user.tipo === "professor" ) {
                let entrada = {
                    id_aluno: req.params.id_aluno,
                    id_lista: req.params.id_lista,
                    id_sala: req.params.id_sala
                }
                let ejs = {
                    user: req.user,
                    page_name: req.path,
                    accountType: req.user.tipo
                }

                let conexaoDb = app.infra.banco.dbConnection();
                let NotasDAO = new app.infra.banco.NotasDAO( conexaoDb );

                NotasDAO.MostrarRespostas( entrada, ( err, resultado ) => {
                    ejs.respostas = resultado;
                    res.render( 'professor/perfil/notas/mostrarExerciciosLista', ejs );
                } );
                conexaoDb.end();
            };
        }
    }
    return notas;
};
module.exports = (app) => {
  const Exercicios = {

    get(req, res) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          lista: req.params.id_lista,
        };

        const entrada = {
          id_lista: req.params.id_lista,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.mostrarDidaticosAluno(entrada.id_lista, (err, resultado) => {
          ejs.exercicios = resultado;
          console.log(resultado);
          res.render('aluno/perfil/didatico/abrirDidaticoAluno', ejs);
        });
        conexaoDb.end();
      } else res.status(403);
    },
  };
  return Exercicios;
};

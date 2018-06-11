module.exports = (app) => {
  const Exercicios = {

    get(req, res) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          didatico: req.params.id_didatico,
        };

        const entrada = {
          id_didatico: req.params.id_didatico,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.abrirDidaticoAluno(entrada.id_didatico, (err, resultado) => {
          if (err) throw (err);
          ejs.didatico = resultado;
          res.render('aluno/perfil/didatico/abrirDidaticoAluno', ejs);
        });
        conexaoDb.end();
      } else res.status(403);
    },
  };
  return Exercicios;
};

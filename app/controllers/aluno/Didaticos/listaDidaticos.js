module.exports = (app) => {
  const Didatico = {

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
          const entrada2 = resultado[0].id;

          const conexaoDb2 = app.infra.banco.dbConnection();
          const DidaticoDAO2 = new app.infra.banco.DidaticoDAO(conexaoDb2);

          DidaticoDAO2.arquivosDownload(entrada2, (err2, resultado2) => {
            if (err2) throw err2;
            ejs.paths = resultado2;
            res.render('aluno/perfil/didatico/abrirDidaticoAluno', ejs);
          });
          conexaoDb2.end();
        });
        conexaoDb.end();
      } else res.status(403);
    },
  };
  return Didatico;
};

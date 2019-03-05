module.exports = (app) => {
  const Aluno = {
    get: (req, res, next) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          file_name: req.params.path,
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.fazerDownloadDidatico(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else res.download(`app/uploads/${resultado[0].file_name}`);
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Aluno;
};

module.exports = (app) => {
  const Professor = {
    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id_professor: req.user.id,
          id: req.params.id,
          file_name: req.params.path,
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.fazerDownload(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else res.download(`app/uploads/${resultado[0].file_name}`);
        });
        conexaoDb.end();
      }
    },
  };

  return Professor;
};

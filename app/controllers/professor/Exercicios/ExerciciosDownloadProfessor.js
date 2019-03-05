module.exports = (app) => {
  const Exercicios = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id: req.params.id,
          file_name: req.params.path,
          id_professor: req.user.id,
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.fazerDownloadExercicio(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else res.download(`app/uploads/${resultado[0].file_name}`);
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Exercicios;
};

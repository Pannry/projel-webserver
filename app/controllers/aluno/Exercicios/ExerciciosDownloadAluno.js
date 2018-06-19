module.exports = (app) => {
  const Exercicios = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id_exercicio: req.params.id_exercicio,
          file_name: req.params.file_name,
        };
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.fazerDownloadAluno(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else res.download(`app/uploads/${resultado[0].file_name}`);
        });
        conexaoDb.end();
      }
    },
  };

  return Exercicios;
};

module.exports = (app) => {
  const Exercicios = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id_exercicios: req.params.id,
          id_professor: req.user.id,
        };
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.abrirExercicio(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else {
            ejs.questao = resultado;
            const entrada2 = resultado[0].id;

            const conexaoDb2 = app.infra.banco.dbConnection();
            const ExerciciosDao2 = new app.infra.banco.ExerciciosDao(conexaoDb2);

            ExerciciosDao2.arquivosDownload(entrada2, (err2, resultado2) => {
              if (err2) throw err2;
              ejs.paths = resultado2;
              res.render('professor/perfil/exercicios/abrirExercicio', ejs);
            });
            conexaoDb2.end();
          }
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Exercicios;
};

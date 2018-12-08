module.exports = (app) => {
  const Exercicios = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);
         ExerciciosDao.listarExercicios(entrada, (err, resultado) => {
          if (err) throw err;
          ejs.listaExercicios = resultado;
           if (!err) { res.render('professor/perfil/exercicios/exercicios', ejs); } else { next(); }
        });
        conexaoDb.end();
      }
    },
  };

  return Exercicios;
};

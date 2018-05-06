module.exports = (app) => {
  const Exercicios = {
    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.mostrarListaExercicios(entrada, (err, resultado) => {
          if (err) throw err;
          ejs.lista = resultado;
          res.render('professor/perfil/exercicios/lista', ejs);
        });
        conexaoDb.end();
      }
    },
  };

  return Exercicios;
};

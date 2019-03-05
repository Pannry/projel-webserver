module.exports = (app) => {
  const Exercicios = {
    delete: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.excluirLista(entrada, (err) => {
          if (err) throw err;
          res.redirect('/professor/profile/exercicios/lista');
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Exercicios;
};

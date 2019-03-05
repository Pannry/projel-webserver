module.exports = (app) => {
  const Exercicios = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.user.id;
        const ejs = {
          user: req.user,
          user_id: req.user.id,
          page_name: req.path,
          accountType: req.user.tipo,
          id_lista: req.params.id,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.listarExercicios(entrada, (err, resultado) => {
          if (err) throw err;
          ejs.lista = resultado;
          res.render('professor/perfil/exercicios/adicionarExercicios', ejs);
        });

        conexaoDb.end();
      } else next();
    },

    post: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const checkbox = req.body.options;
        const vetor = [];
        const entrada = { id_lista: req.params.id };

        if (checkbox !== undefined) {
          for (let i = 0; i < checkbox.length; i += 1) { vetor[i] = checkbox[i]; }

          vetor.forEach((element) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

            entrada.id_exercicios = element;
            ExerciciosDao.adicionarExercicioLista(entrada, () => { });

            conexaoDb.end();
          });
        }

        res.redirect('/professor/profile/exercicios/lista');
      } else next();
    },
  };
  return Exercicios;
};

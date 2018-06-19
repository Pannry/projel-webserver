module.exports = (app) => {
  const Exercicios = {

    get(req, res) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          lista: req.params.id_lista,
        };

        const entrada = {
          id_lista: req.params.id_lista,
        };

        const firstMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

            ExerciciosDao.mostrarExerciciosAluno(entrada.id_lista, (err, resultado) => {
              ejs.exercicios = resultado;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const secondMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

            ExerciciosDao.mostrarListaInfo(entrada.id_lista, (err, resultado) => {
              if (err) throw (err);
              ejs.listaInfo = resultado;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const thirdMethod = function () {
          res.render('aluno/perfil/exercicios/abrirListaAluno', ejs);
        };

        firstMethod()
          .then(secondMethod)
          .then(thirdMethod)
          .catch((err) => { throw (err); });
      } else res.status(403);
    },
  };
  return Exercicios;
};

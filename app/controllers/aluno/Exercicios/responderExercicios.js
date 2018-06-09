module.exports = (app) => {
  const Exercicios = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id_sala: req.params.id_sala,
          // id_lista: req.params.id_lista,
          id_exercicios: req.params.id_exercicio,
          id_aluno: req.user.id,
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          lista: req.params.id_lista,
        };

        const firstMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

            ExerciciosDao.abrirExercicio(entrada, (err, resultado) => {
              if (err) throw (err);
              ejs.exercicio = resultado;
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

            ExerciciosDao.abrirRespostaAluno(entrada, (err, resultado) => {
              if (err) throw (err);
              if (resultado.length === 0) {
                entrada.resposta = '';
                entrada.pdf_path = '';

                const conexaoDb1 = app.infra.banco.dbConnection();
                const ExerciciosDao1 = new app.infra.banco.ExerciciosDao(conexaoDb1);

                ExerciciosDao1.criarResposta(entrada, (err3) => {
                  if (err3) throw (err3);
                  ejs.respostaAluno = '';
                  resolve();
                });

                conexaoDb1.end();
              } else {
                ejs.respostaAluno = resultado[0].resposta;
                resolve();
              }
            });

            conexaoDb.end();
          });
          return promise;
        };

        const thirdMethod = function () {
          res.render('aluno/perfil/exercicios/responderExercicio', ejs);
        };

        firstMethod()
          .then(secondMethod)
          .then(thirdMethod)
          .catch((err) => { throw (err); });
      } else { res.status(403); }
    },

    post: (req, res) => {
      const entrada = {
        id_aluno: req.user.id,
        id_exercicios: req.params.id_exercicio,
        id_sala: req.params.id_sala,
        pdf_path: '',
        resposta: req.body.resposta,
      };

      const ejs = {
        sala: req.params.id_sala,
        lista: req.params.id_lista,
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

      ExerciciosDao.responderExerciciosAluno(entrada, (err) => {
        if (err) throw (err);
        res.redirect(`/turmas/abrir/listas/${ejs.sala}/${ejs.lista}`);
      });

      conexaoDb.end();
    },
  };

  return Exercicios;
};

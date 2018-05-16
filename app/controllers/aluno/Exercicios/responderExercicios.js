module.exports = (app) => {
  const Exercicios = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id_exercicios: req.params.id_exercicio,
          id_sala: req.params.id_sala,
          id_aluno: req.user.id,
          resposta: '',
          pdf_path: '',
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          lista: req.params.id_lista,
          respostaAluno: '',
        };

        const conexaoDb3 = app.infra.banco.dbConnection();
        const ExerciciosDao3 = new app.infra.banco.ExerciciosDao(conexaoDb3);

        ExerciciosDao3.abrirExercicio(entrada.id_exercicios, (err, resultado3) => {
          if (err) console.error(err);
          ejs.exercicio = resultado3;

          const conexaoDb2 = app.infra.banco.dbConnection();
          const ExerciciosDao2 = new app.infra.banco.ExerciciosDao(conexaoDb2);

          ExerciciosDao2.abrirRespostaAluno(entrada, (err2, resultado2) => {
            if (err2) console.error(err2);
            if (resultado2.length === 0) {
              const conexaoDb1 = app.infra.banco.dbConnection();
              const ExerciciosDao1 = new app.infra.banco.ExerciciosDao(conexaoDb1);

              ExerciciosDao1.criarResposta(entrada, (err3) => {
                if (err3) console.error(err3);
                res.render('aluno/perfil/exercicios/responderExercicio', ejs);
              });

              conexaoDb1.end();
            } else {
              ejs.respostaAluno = resultado2[0].resposta;
              res.render('aluno/perfil/exercicios/responderExercicio', ejs);
            }
          });
          conexaoDb2.end();
        });
        conexaoDb3.end();
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
        res.redirect(`/turmas/abrir/${ejs.sala}/${ejs.lista}`);
      });

      conexaoDb.end();
    },
  };

  return Exercicios;
};

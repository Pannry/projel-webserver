module.exports = (app) => {
  const Aluno = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada1 = req.params.id;
        const entrada2 = {
          id_aluno: req.user.id,
        };
        const entrada3 = req.params.id;


        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const firstMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb1 = app.infra.banco.dbConnection();
            const salaDAO = new app.infra.banco.SalaDAO(conexaoDb1);

            salaDAO.buscarSala(entrada1, (err, resultado1) => {
              if (err) throw (err);
              ejs.sala = resultado1;
              entrada2.id_sala = resultado1[0].id;
              resolve();
            });
            conexaoDb1.end();
          });
          return promise;
        };

        const secondMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb2 = app.infra.banco.dbConnection();
            const salaDAO2 = new app.infra.banco.SalaDAO(conexaoDb2);

            salaDAO2.verificarAutenticacao(entrada2, (err2, resultado2) => {
              ejs.aluno_aceito = resultado2[0].aluno_aceito;
              resolve();
            });
            conexaoDb2.end();
          });
          return promise;
        };

        const thirdMethod = function () {
          const promise = new Promise((resolve) => {
            const conexaoDb3 = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb3);

            ExerciciosDao.mostrarListasAluno(entrada3, (err3, resultado3) => {
              ejs.lista = resultado3;
              resolve();
            });
            conexaoDb3.end();
          });
          return promise;
        };

        const fourthMethod = function () {
          const promise = new Promise(() => {
            res.render('aluno/perfil/turmas/abrirTurma', ejs);
          });
          return promise;
        };

        firstMethod()
          .then(secondMethod)
          .then(thirdMethod)
          .then(fourthMethod)
          .catch((err) => { console.log(err); });
      }
    },
  };
  return Aluno;
};

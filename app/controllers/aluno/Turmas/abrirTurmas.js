module.exports = (app) => {
  const Aluno = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id: req.params.id,
          id_aluno: req.user.id,
        };

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const firstMethod = function () {
          // Carrega as informações da sala
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

            salaDAO.buscarSala(entrada.id, (err, resultado) => {
              if (err) throw (err);
              ejs.sala = resultado;
              // entrada.id_sala = resultado[0].id;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const secondMethod = function () {
          // Verifica se o aluno foi aceito na sala de aula
          // pelo professor
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const salaDAO2 = new app.infra.banco.SalaDAO(conexaoDb);

            salaDAO2.verificarAutenticacao(entrada, (err, resultado) => {
              if (err) throw (err);
              ejs.aluno_aceito = resultado[0].aluno_aceito;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const thirdMethod = function () {
          // Mostra as listas de exercicios incluido pelo professor
          // para a turma
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

            ExerciciosDao.mostrarListasAluno(entrada.id, (err, resultado) => {
              if (err) throw (err);
              ejs.lista = resultado;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const fourthMethod = function () {
          // Mostra os materiais didaticos incluido pelo professor
          // para a turma
          const promise = new Promise((resolve) => {
            const conexaoDb = app.infra.banco.dbConnection();
            const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

            DidaticoDAO.mostrarDidaticosAluno(entrada.id, (err, resultado) => {
              if (err) throw (err);
              ejs.didatico = resultado;
              resolve();
            });
            conexaoDb.end();
          });
          return promise;
        };

        const fifthMethod = function () {
          res.render('aluno/perfil/turmas/abrirTurma', ejs);
        };

        firstMethod()
          .then(secondMethod)
          .then(thirdMethod)
          .then(fourthMethod)
          .then(fifthMethod)
          .catch((err) => { console.log(err); });
      }
    },
  };
  return Aluno;
};

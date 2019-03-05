module.exports = (app) => {
  const turmas = {

    professorGET: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          idSala: req.params.id,
        };

        const conexaoDb1 = app.infra.banco.dbConnection();
        const salaDAO1 = new app.infra.banco.SalaDAO(conexaoDb1);

        salaDAO1.buscarSala(entrada, (err, saida1) => {
          if (err) throw err;
          ejs.infoProfessor = saida1;

          const conexaoDb2 = app.infra.banco.dbConnection();
          const salaDAO2 = new app.infra.banco.SalaDAO(conexaoDb2);

          salaDAO2.listarAlunos(entrada, (err2, saida2) => {
            if (err2) throw err2;
            ejs.listaDeAlunos = saida2;

            if (!err && !err2 && saida1.length !== 0) {
              if (saida1[0].id_professor === req.user.id) res.render('professor/perfil/turmas/abrirTurmaProfessor', ejs);
              else res.render('erro/403', ejs);
            }
          });
          conexaoDb2.end();
        });
        conexaoDb1.end();
      } else next();
    },

    alunoGET: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          idSala: req.params.id,
        };

        const conexaoDb1 = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb1);

        salaDAO.buscarSala(entrada, (err, saida1) => {
          if (err) throw err;
          ejs.infoProfessor = saida1;

          const conexaoDb2 = app.infra.banco.dbConnection();
          const exercicioDao = new app.infra.banco.ExerciciosDao(conexaoDb2);

          exercicioDao.mostrarExerciciosInclusos(entrada, (err2, saida2) => {
            if (err2) throw err2;
            ejs.lista = saida2;

            const conexaoDb3 = app.infra.banco.dbConnection();
            const didaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb3);

            didaticoDAO.mostrarDidaticosInclusosNaSala(entrada, (err3, saida3) => {
              if (err3) throw err3;
              ejs.didatico = saida3;

              if (!err && !err2 && !err3 && saida1.length !== 0) {
                if (saida1[0].id_professor === req.user.id) {
                  res.render('professor/perfil/turmas/abrirTurmaAluno', ejs);
                } else {
                  res.render('erro/403', ejs);
                }
              }
            });
            conexaoDb3.end();
          });
          conexaoDb2.end();
        });
        conexaoDb1.end();
      } else next();
    },

    autenticarAlunoNaTurma: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id_sala: req.params.id,
          id_aluno: Object.keys(req.body)[0],
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.autenticarAluno(entrada, (err) => {
          if (err) throw err;
          res.redirect(`/professor/turma/abrir/${entrada.id_sala}/professor`);
        });
        conexaoDb.end();
      } else next();
    },

    comentario: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id: req.params.id,
          comentario: req.body.comentario,
        };
        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.modificarComentario(entrada, (err) => {
          if (err) throw err;
          res.redirect(`/professor/turma/abrir/${entrada.id}/aluno`);
        });

        conexaoDb.end();
      } else next();
    },
  };

  return turmas;
};

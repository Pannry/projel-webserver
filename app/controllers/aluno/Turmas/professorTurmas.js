module.exports = (app) => {
  const Aluno = {
    get: (req, res, next) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id_professor: req.query.idProf,
          cod_sala: req.query.codSala,
        };
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.listaSalaProfessor(entrada, (err, resultado) => {
          const result = resultado[0];
          ejs.detalhesSala = result;
          res.render('aluno/perfil/turmas/professorTurmas', ejs);
        });

        conexaoDb.end();
      } else next();
    },

    post: (req, res, next) => {
      if (req.user.tipo === 'aluno') {
        const entrada = {
          id_sala: Object.keys(req.body)[0],
          id_aluno: req.user.id,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.alunoEntrarTurma(entrada, () => {
          res.redirect('/profile/turmas');
        });

        conexaoDb.end();
      } else next();
    },
  };

  return Aluno;
};

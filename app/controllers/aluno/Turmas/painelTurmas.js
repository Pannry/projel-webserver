module.exports = (app) => {
  const Aluno = {
    get: (req, res, next) => {
      if (req.user.tipo === 'aluno') {
        const entrada = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.listaSalaAluno(entrada, (err, resultadoAluno) => {
          ejs.listaSalaAluno = resultadoAluno;
          res.render('aluno/perfil/turmas/minhasTurmas', ejs);
        });

        conexaoDb.end();
      } else next();
    },
  };
  return Aluno;
};

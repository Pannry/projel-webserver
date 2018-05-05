module.exports = function (app) {
  Aluno = {
    get: (req, res) => {
      if (req.user.tipo == 'aluno') {

        let entrada = req.user.id;

        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        let conexaoDb = app.infra.banco.dbConnection();
        let salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.listaSalaAluno(entrada, function (err, resultadoAluno) {
          ejs.listaSalaAluno = resultadoAluno;
          res.render('aluno/perfil/turmas/minhasTurmas', ejs);
        });

        conexaoDb.end();
      }
    },

    post: (req, res) => {
      res.send('<h1>Turma Aluno</h1>');
    }
  };
  return Aluno;
}

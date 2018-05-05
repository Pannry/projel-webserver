module.exports = function (app) {
  Aluno = {
    get: (req, res) => {
      if (req.user.tipo == 'aluno') {

        let entrada = req.params.id;
        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        }

        let conexaoDb = app.infra.banco.dbConnection();
        let salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.listaSalaProfessor(entrada, (err, resultado) => {
          ejs.listaSalaAluno = resultado;
          res.render('aluno/perfil/turmas/professorTurmas', ejs);
        });

        conexaoDb.end();
      } else res.status(403);
    },

    post: (req, res) => {
      if (req.user.tipo == 'aluno') {

        let entrada = {
          id_sala: Object.keys(req.body)[0],
          id_aluno: req.user.id
        }

        var conexaoDb = app.infra.banco.dbConnection();
        var salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        salaDAO.alunoEntrarTurma(entrada, (err) => {
          res.redirect('/profile/turmas');

        });

        conexaoDb.end();

      } else
        res.status(403);
    }
  };

  return Aluno;
}

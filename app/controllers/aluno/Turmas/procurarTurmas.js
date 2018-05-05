module.exports = function (app) {
  Aluno = {
    get: (req, res) => {
      if (req.user.tipo == 'aluno') {

        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        }

        let conexaoDb = app.infra.banco.dbConnection();
        let usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.listaProfessor(function (err, resultado) {
          ejs.listaSalaProfessor = resultado;
          res.render('aluno/perfil/turmas/selecionarProfessor', ejs);
        });

        conexaoDb.end();
      }
    }
  }
  return Aluno;
}

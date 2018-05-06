module.exports = (app) => {
  const Aluno = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

        usuarioDAO.listaProfessor((err, resultado) => {
          ejs.listaSalaProfessor = resultado;
          res.render('aluno/perfil/turmas/selecionarProfessor', ejs);
        });

        conexaoDb.end();
      }
    },
  };
  return Aluno;
};

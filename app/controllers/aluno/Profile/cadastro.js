const bcrypt = require('bcrypt');

module.exports = (app) => {
  const saltRounds = 7;

  const Aluno = {
    get: (req, res) => {
      const ejs = {};

      const conexaoDb = app.infra.banco.dbConnection();
      const instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

      instituicaoDAO.listaInstituicao((err, resultado) => {
        ejs.listaDeInstituicao = resultado;
        res.render('aluno/signup', ejs);
      });

      conexaoDb.end();
    },

    post: (req, res) => {
      const entrada = req.body;

      entrada.senha = bcrypt.hashSync(entrada.senha, saltRounds);

      const conexaoDb = app.infra.banco.dbConnection();
      const usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

      usuarioDAO.salvarAluno(entrada, (err) => {
        if (err) throw (err);
        res.redirect('/aluno/login');
      });
      conexaoDb.end();
    },
  };
  return Aluno;
};

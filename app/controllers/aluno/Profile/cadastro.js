const bcrypt = require('bcrypt');

module.exports = (app) => {
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

      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(entrada.senha, salt, (err1, hash) => {
          if (err1) throw (err1);
          entrada.senha = hash;

          const conexaoDb = app.infra.banco.dbConnection();
          const usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

          usuarioDAO.salvarAluno(entrada, (err2) => {
            if (err2) throw (err2);
            res.redirect('/aluno/login');
          });
          conexaoDb.end();
        });
      });
    },
  };
  return Aluno;
};

const bcrypt = require('bcrypt');

module.exports = (app) => {
  const Professor = {
    get: (req, res) => {
      const params = {};

      const conexaoDb = app.infra.banco.dbConnection();
      const instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

      instituicaoDAO.listaInstituicao((err, resultado) => {
        if (err) throw err;
        params.listaDeInstituicao = resultado;
        res.render('professor/signup', params);
      });

      conexaoDb.end();
    },

    post: (req, res) => {
      const entrada = req.body;
      bcrypt.genSalt((err, salt) => {
        bcrypt.hash(entrada.senha, salt, (err1, hash) => {
          if (err) throw err1;
          entrada.senha = hash;

          const conexaoDb = app.infra.banco.dbConnection();
          const usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

          usuarioDAO.salvarProfessor(entrada, (err2) => {
            if (err2) throw err2;
            res.redirect('/professor/login');
          });
          conexaoDb.end();
        });
      });
    },
  };
  return Professor;
};

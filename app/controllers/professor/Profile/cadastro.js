const bcrypt = require('bcrypt');

const saltRounds = 7;
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

      entrada.senha = bcrypt.hashSync(entrada.senha, saltRounds);

      const conexaoDb = app.infra.banco.dbConnection();
      const usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

      usuarioDAO.salvarProfessor(entrada, (err) => {
        if (err) throw err;
        res.redirect('/professor/login');
      });
      conexaoDb.end();
    },
  };
  return Professor;
};

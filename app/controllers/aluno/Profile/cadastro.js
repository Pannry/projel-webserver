module.exports = function (app) {
  let bcrypt = require('bcrypt');
  const saltRounds = 7;

  Aluno = {
    get: (req, res) => {

      let ejs = {};

      let conexaoDb = app.infra.banco.dbConnection();
      let instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

      instituicaoDAO.listaInstituicao((err, resultado) => {
        ejs.listaDeInstituicao = resultado;
        res.render('aluno/signup', ejs);
      });

      conexaoDb.end();
    },

    post: (req, res) => {
      let entrada = req.body;

      entrada.senha = bcrypt.hashSync(entrada.senha, saltRounds);

      let conexaoDb = app.infra.banco.dbConnection();
      let usuarioDAO = new app.infra.banco.UsuarioDAO(conexaoDb);

      usuarioDAO.salvarAluno(entrada, (err) => {
        res.redirect('/aluno/login');
      });
      conexaoDb.end();
    }
  };
  return Aluno;
}
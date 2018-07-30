module.exports = (app) => {
  const passport = app.get('passport');
  const Aluno = {
    get: (req, res) => {
      const ejs = {
        message: req.flash('signupMessage'),
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

      instituicaoDAO.listaInstituicao((err, resultado) => {
        ejs.listaDeInstituicao = resultado;
        res.render('aluno/signup', ejs);
      });

      conexaoDb.end();
    },

    post: passport.authenticate('local-signup-aluno', {
      successRedirect: '/profile',
      failureRedirect: '/aluno/signup',
      failureFlash: true,
    }),
  };
  return Aluno;
};

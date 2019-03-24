module.exports = (app) => {
  const passport = app.get('passport');
  const Professor = {
    get: (req, res) => {
      const params = {
        message: req.flash('signupMessage'),
        signupLink: process.env.TSECRET_SIGNUP,
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const instituicaoDAO = new app.infra.banco.InstituicaoDAO(conexaoDb);

      instituicaoDAO.listaInstituicao((err, resultado) => {
        if (err) throw err;
        params.listaDeInstituicao = resultado;
        res.render('professor/signup', params);
      });

      conexaoDb.end();
    },

    post: passport.authenticate('local-signup-professor', {
      successRedirect: '/professor/profile',
      failureRedirect: process.env.TSECRET_SIGNUP,
      failureFlash: true,
    }),
  };
  return Professor;
};

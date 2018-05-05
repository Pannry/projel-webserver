module.exports = function (app) {
  let passport = app.get('passport');

  Aluno = {
    get: (req, res) => {
      res.render('aluno/login', { message: req.flash('loginMessage') });
    },

    post: passport.authenticate('local-login-aluno', {
      successRedirect: '/profile',
      failureRedirect: '/aluno/login',
      failureFlash: true
    })
  };
  return Aluno;
}


module.exports = (app) => {
  const passport = app.get('passport');
  const Professor = {
    get: (req, res) => {
      res.render('professor/login', { message: req.flash('loginMessage') });
    },

    post: passport.authenticate('local-login-professor', {
      successRedirect: '/professor/profile',
      failureRedirect: '/professor/login',
      failureFlash: true,
    }),
  };


  return Professor;
};

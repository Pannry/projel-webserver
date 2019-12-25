const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
  return 0;
};

module.exports = checkAuth;

module.exports = () => {
  const Professor = {
    logout: (req, res) => {
      req.logout();
      res.redirect('/');
    },
  };

  return Professor;
};

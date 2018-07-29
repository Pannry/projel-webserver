module.exports = () => {
  const Aluno = {
    logout: (req, res) => {
      req.logout();
      res.redirect('/');
    },
  };

  return Aluno;
};

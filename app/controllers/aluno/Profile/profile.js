module.exports = () => {
  const Aluno = {
    get(req, res, next) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('aluno/perfil/perfil', ejs);
      } else next();
    },

    update(req, res, next) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('aluno/perfil/atualizarPerfil', ejs);
      } else next();
    },
  };
  return Aluno;
};

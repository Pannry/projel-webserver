module.exports = () => {
  const Professor = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const params = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('professor/perfil/perfil', params);
      } else next();
    },

    update: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const params = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('professor/perfil/atualizarPerfil', params);
      } else next();
    },

  };

  return Professor;
};

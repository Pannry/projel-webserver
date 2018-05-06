module.exports = () => {
  const Professor = {
    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const params = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('professor/perfil/perfil', params);
      }
    },

    update: (req, res) => {
      if (req.user.tipo === 'professor') {
        const params = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('professor/perfil/atualizarPerfil', params);
      }
    },

  };

  return Professor;
};

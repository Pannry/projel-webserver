module.exports = () => {
  const Aluno = {
    get(req, res) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('aluno/perfil/perfil', ejs);
      }
    },

    update(req, res) {
      if (req.user.tipo === 'aluno') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('aluno/perfil/atualizarPerfil', ejs);
      }
    },
  };
  return Aluno;
};

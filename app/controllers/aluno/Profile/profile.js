module.exports = function (app) {
  Aluno = {
    get: function (req, res) {
      if (req.user.tipo == "aluno") {
        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo
        };
        res.render('aluno/perfil/perfil', ejs);
      }
    },

    update: function (req, res) {
      if (req.user.tipo == "aluno") {
        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo
        };
        res.render('aluno/perfil/atualizarPerfil', ejs);
      }
    }
  };
  return Aluno;
}

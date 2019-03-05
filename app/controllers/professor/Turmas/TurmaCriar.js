module.exports = (app) => {
  const turmas = {

    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        res.render('professor/perfil/turmas/criarTurma', ejs);
      } else next();
    },

    post: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          nome: req.body.nome,
          semestre: req.body.semestre,
          id_professor: req.user.id,
          comentario: '',
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        entrada.cod_sala = Date.now().toString().substring(3, 13);

        salaDAO.addSala(entrada, (err) => {
          if (err) throw err;
          res.redirect('/professor/profile/turmas');
        });

        conexaoDb.end();
      } else next();
    },
  };

  return turmas;
};

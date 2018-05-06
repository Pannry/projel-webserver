module.exports = (app) => {
  const Exercicios = {
    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        res.render('professor/perfil/exercicios/criarLista', ejs);
      }
    },
    post: (req, res, next) => {
      const entrada = {
        id_professor: req.user.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        tipo: req.body.tipoDeLista,
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

      ExerciciosDao.criarListaExercicios(entrada, (err, resultado) => {
        if (err) throw err;
        else if (!err) res.redirect(`/professor/exercicios/lista/abrir/${resultado.insertId}/editar`);
        else next();
      });
      conexaoDb.end();
    },
  };

  return Exercicios;
};

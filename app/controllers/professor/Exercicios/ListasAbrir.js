module.exports = (app) => {
  const Exercicios = {
    mostrarInformacoes: (req, res) => {
      const entrada = {
        id_professor: req.user.id,
        id: req.params.id,
      };

      const ejs = {
        user: req.user,
        page_name: req.path,
        accountType: req.user.tipo,
        id: req.params.id,
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

      ExerciciosDao.abrirLista(entrada, (err, resultado) => {
        if (err) throw err;
        if (resultado.length === 0) res.render('erro/403', ejs);
        else {
          ejs.lista = resultado;
          res.render('professor/perfil/exercicios/abrirListaInfo', ejs);
        }
      });

      conexaoDb.end();
    },

    mostrarQuestoes: (req, res) => {
      const entrada = {
        id_lista: req.params.id,
      };

      const ejs = {
        user: req.user,
        page_name: req.path,
        accountType: req.user.tipo,
        id: req.params.id,
      };

      const conexaoDb = app.infra.banco.dbConnection();
      const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

      ExerciciosDao.mostrarQuestoes(entrada, (err, resultado) => {
        if (err) throw err;
        ejs.exercicios = resultado;
        res.render('professor/perfil/exercicios/abrirListaExercicios', ejs);
      });
      conexaoDb.end();
    },
  };

  return Exercicios;
};

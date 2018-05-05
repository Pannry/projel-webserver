module.exports = function (app) {
  Exercicios = {

    get: function (req, res) {
      if (req.user.tipo == 'aluno') {

        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          sala: req.params.id_sala,
          lista: req.params.id_lista
        }

        let entrada = {
          id_lista: req.params.id_lista,
        }

        let conexaoDb = app.infra.banco.dbConnection();
        let ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.mostrarExerciciosAluno(entrada.id_lista, function (err, resultado) {
          ejs.exercicios = resultado;
          res.render('aluno/perfil/exercicios/abrirListaAluno', ejs);

        });
        conexaoDb.end();
      } else
        res.status(403);
    }
  }
  return Exercicios;
};

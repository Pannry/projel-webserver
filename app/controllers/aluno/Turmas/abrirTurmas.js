module.exports = function (app) {
  Aluno = {
    get: (req, res) => {
      if (req.user.tipo == 'aluno') {

        let entrada1 = req.params.id;
        let entrada2 = {
          id_aluno: req.user.id,
        }
        let entrada3 = req.params.id;


        let ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo
        }

        let conexaoDb1 = app.infra.banco.dbConnection();
        let salaDAO = new app.infra.banco.SalaDAO(conexaoDb1);

        //Informações da sala
        salaDAO.buscarSala(entrada1, function (err, resultado1) {
          ejs.sala = resultado1;
          entrada2.id_sala = resultado1[0].id;

          let conexaoDb2 = app.infra.banco.dbConnection();
          let salaDAO = new app.infra.banco.SalaDAO(conexaoDb2);

          salaDAO.verificarAutenticacao(entrada2, function (err, resultado2) {
            ejs.aluno_aceito = resultado2[0].aluno_aceito;

            let conexaoDb3 = app.infra.banco.dbConnection();
            let ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb3);

            ExerciciosDao.mostrarListasAluno(entrada3, function (err, resultado3) {
              ejs.lista = resultado3;

              res.render('aluno/perfil/turmas/abrirTurma', ejs);
            });
            conexaoDb3.end();
          });
          conexaoDb2.end();
        });
        conexaoDb1.end();
      }
    }
  };
  return Aluno;
}

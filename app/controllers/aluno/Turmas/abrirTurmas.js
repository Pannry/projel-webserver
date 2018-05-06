module.exports = (app) => {
  const Aluno = {
    get: (req, res) => {
      if (req.user.tipo === 'aluno') {
        const entrada1 = req.params.id;
        const entrada2 = {
          id_aluno: req.user.id,
        };
        const entrada3 = req.params.id;


        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb1 = app.infra.banco.dbConnection();
        const salaDAO = new app.infra.banco.SalaDAO(conexaoDb1);

        // Informações da sala
        salaDAO.buscarSala(entrada1, (err, resultado1) => {
          ejs.sala = resultado1;
          entrada2.id_sala = resultado1[0].id;

          const conexaoDb2 = app.infra.banco.dbConnection();
          const salaDAO2 = new app.infra.banco.SalaDAO(conexaoDb2);

          salaDAO2.verificarAutenticacao(entrada2, (err, resultado2) => {
            ejs.aluno_aceito = resultado2[0].aluno_aceito;

            const conexaoDb3 = app.infra.banco.dbConnection();
            const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb3);

            ExerciciosDao.mostrarListasAluno(entrada3, (err, resultado3) => {
              ejs.lista = resultado3;

              res.render('aluno/perfil/turmas/abrirTurma', ejs);
            });
            conexaoDb3.end();
          });
          conexaoDb2.end();
        });
        conexaoDb1.end();
      }
    },
  };
  return Aluno;
};

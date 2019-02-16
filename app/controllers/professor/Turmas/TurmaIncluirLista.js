module.exports = (app) => {
  const turmas = {

    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const idProfessor = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
          idSala: req.params.id,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.mostrarListaExercicios(idProfessor, (err, resultado) => {
          if (err) throw err;
          ejs.lista = resultado;
          res.render('professor/perfil/turmas/listarListaParaAdicionar', ejs);
        });
        conexaoDb.end();
      }
    },

    post: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id_sala: req.params.id,
        };

        const checkbox = req.body.options;
        let listas = [];

        if (!Array.isArray(checkbox)) listas = Array.of(checkbox);
        else listas = checkbox;

        if (checkbox !== undefined) {
          const conexaoDb = app.infra.banco.dbConnection();
          const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

          listas.forEach((element) => {
            entrada.id_lista = element;
            ExerciciosDao.listasParaIncluir(entrada, (err) => {
              if (err) {
                if (err.errno !== 1062) throw err;
              }
            });
          });
          conexaoDb.end();
        }

        res.redirect(`/professor/turma/abrir/${entrada.id_sala}/aluno`);
      }
    },
  };
  return turmas;
};

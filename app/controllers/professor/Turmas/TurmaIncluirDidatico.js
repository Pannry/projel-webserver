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
        const didaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        didaticoDAO.mostrarListaDidaticos(idProfessor, (err, resultado) => {
          if (err) throw err;
          ejs.lista = resultado;
          res.render('professor/perfil/turmas/listarDidaticoParaAdicionar', ejs);
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
        let materiais = [];

        if (!Array.isArray(checkbox)) materiais = Array.of(checkbox);
        else materiais = checkbox;

        if (checkbox !== undefined) {
          const conexaoDb = app.infra.banco.dbConnection();
          const didaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

          materiais.forEach((element) => {
            entrada.id_didatico = element;
            didaticoDAO.didaticoParaIncluir(entrada, (err) => {
              if (err) {
                // Tratar o erro 1062 algum dia...
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

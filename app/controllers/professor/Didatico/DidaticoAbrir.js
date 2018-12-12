module.exports = (app) => {
  const Professor = {
    get: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id: req.params.id,
          id_professor: req.user.id,
        };
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.abrirDidatico(entrada, (err, resultado) => {
          if (err) throw err;
          if (resultado.length === 0) res.render('erro/403', ejs);
          else {
            ejs.conteudo = resultado;
            const entrada2 = resultado[0].id;

            const conexaoDb2 = app.infra.banco.dbConnection();
            const DidaticoDAO2 = new app.infra.banco.DidaticoDAO(conexaoDb2);

            DidaticoDAO2.arquivosDownload(entrada2, (err2, resultado2) => {
              if (err2) throw err2;
              ejs.paths = resultado2;
              console.log(resultado2)
              res.render('professor/perfil/didatico/abrirDidatico', ejs);
            });
            conexaoDb2.end();
          }
        });
        conexaoDb.end();
      }
    },
  };

  return Professor;
};

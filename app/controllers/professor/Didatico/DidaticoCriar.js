module.exports = (app) => {
  const Professor = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };
        res.render('professor/perfil/didatico/criarDidatico', ejs);
      } else next();
    },

    post: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = {
          id_professor: req.user.id,
          titulo: req.body.titulo,
          descricao: req.body.descricao,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.criarDidatico(entrada, (err, results) => {
          if (err) throw err;
          const conexaoDb2 = app.infra.banco.dbConnection();
          const DidaticoDAO2 = new app.infra.banco.DidaticoDAO(conexaoDb2);

          req.files.forEach((element) => {
            const entrada2 = {
              id: results.insertId, // retorna a PRIMARY KEY do INSERT anterior
              file_name: element.filename,
            };

            DidaticoDAO2.adicionarMaterial(entrada2, (err2) => { if (err2) throw err; });
          });

          conexaoDb2.end();
          res.redirect('/professor/profile/didatico');
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Professor;
};

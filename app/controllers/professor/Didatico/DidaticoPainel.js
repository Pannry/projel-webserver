module.exports = (app) => {
  const Professor = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.mostrarListaDidaticos(entrada, (err, resultado) => {
          if (err) throw err;
          ejs.listaDidatico = resultado;

          if (!err) res.render('professor/perfil/didatico/didatico', ejs);
          else next();
        });
        conexaoDb.end();
      } else next();
    },
  };

  return Professor;
};

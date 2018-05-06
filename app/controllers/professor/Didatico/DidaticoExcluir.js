const fs = require('fs');

module.exports = (app) => {
  const Professor = {
    delete: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const conexaoDb = app.infra.banco.dbConnection();
        const DidaticoDAO = new app.infra.banco.DidaticoDAO(conexaoDb);

        DidaticoDAO.arquivosDownload(entrada, (err, results) => {
          if (err) throw err;
          results.forEach((file) => {
            const path = 'app/uploads/';
            fs.unlink(path + file.file_name, () => { });
          });

          const conexaoDb2 = app.infra.banco.dbConnection();
          const DidaticoDAO2 = new app.infra.banco.DidaticoDAO(conexaoDb2);

          DidaticoDAO2.excluirDidatico(entrada, (err2) => {
            if (err2) throw err2;
            res.redirect('/professor/profile/didatico');
          });
          conexaoDb2.end();
        });
        conexaoDb.end();
      }
    },
  };

  return Professor;
};

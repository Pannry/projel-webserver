module.exports = (app) => {
  const turmas = {

    delete: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const conexaoDb = app.infra.banco.dbConnection();
        const SalaDAO = new app.infra.banco.SalaDAO(conexaoDb);

        SalaDAO.excluirSala(entrada, (err) => {
          if (err) throw err;
          res.redirect('/professor/profile/turmas');
        });
        conexaoDb.end();
      }
    },

  };

  return turmas;
};

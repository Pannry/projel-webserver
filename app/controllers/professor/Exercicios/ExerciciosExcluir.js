const fs = require('fs');

module.exports = (app) => {
  const Exercicios = {
    delete: (req, res) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.params.id;

        const conexaoDb = app.infra.banco.dbConnection();
        const ExerciciosDao = new app.infra.banco.ExerciciosDao(conexaoDb);

        ExerciciosDao.arquivosDownload(entrada, (err, results) => {
          if (err) throw err;
          results.forEach((file) => {
            const path = 'app/uploads/';
            fs.unlink(path + file.file_name, () => { });
          });

          const conexaoDb2 = app.infra.banco.dbConnection();
          const ExerciciosDao2 = new app.infra.banco.ExerciciosDao(conexaoDb2);

          ExerciciosDao2.excluirExercicio(entrada, (err2) => {
            if (err2) throw err2;
            res.redirect('/professor/profile/exercicios');
          });
          conexaoDb2.end();
        });
        conexaoDb.end();
      }
    },
  };

  return Exercicios;
};

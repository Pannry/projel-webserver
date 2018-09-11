const ExerciciosDao = require('../../../middlewares/lista-Exercicios-Dao');

module.exports = () => {
  const Exercicios = {
    get: (req, res, next) => {
      if (req.user.tipo === 'professor') {
        const entrada = req.user.id;

        const ejs = {
          user: req.user,
          page_name: req.path,
          accountType: req.user.tipo,
        };

        new ExerciciosDao(req.connection)
          .retornarExercicios(entrada)
          .then((exercises) => { ejs.listaExercicios = exercises; })
          .then(() => { res.render('professor/perfil/exercicios/exercicios', ejs); })
          .catch(next);
      }
    },
  };

  return Exercicios;
};

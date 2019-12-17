const asyncHandler = require('../../../middlewares/async');
const ExercicioDao = require('../../../infra/banco/ExercicioDao');

// @Turmas
exports.getExercises = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_professor: req.user.id,
    };

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const exercises = new ExercicioDao();
    const result = await exercises.list(entrada);

    ejs.listaExercicios = result;

    res.render('professor/perfil/exercicios/exercicios', ejs);
  } else {
    next();
  }
});

const asyncHandler = require('../../../middlewares/async');
const ExercicioDao = require('../../../infra/banco/ExercicioDao');

// @Turmas
exports.getExercisesList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    //
  } else {
    next();
  }
});
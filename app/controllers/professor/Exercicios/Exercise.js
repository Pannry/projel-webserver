const asyncHandler = require('../../../middlewares/async');
const ExercicioDao = require('../../../infra/banco/ExercicioDao');
const fs = require('fs');

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

exports.getCreateExercises = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };
    res.render('professor/perfil/exercicios/criarExercicios', ejs);
  } else {
    next();
  }
});

exports.postCreateExercises = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const exerciseDescription = {
      id_professor: req.user.id,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
    };

    const exercises = new ExercicioDao();
    const result = await exercises.create(exerciseDescription);

    const promiseList = [];

    req.files.forEach((element) => {
      const returnPromise = new Promise(async (resolve) => {
        const exerciseData = {
          id: result.insertId,
          file_name: element.filename,
        };
        const materialExercises = new ExercicioDao();
        await materialExercises.addMaterial(exerciseData);
        resolve();
      });
      promiseList.push(returnPromise);
    });

    await Promise.all(promiseList);

    res.redirect('/professor/exercicios');
  } else {
    next();
  }
});

exports.openExercise = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const teacherData = [req.params.id, req.user.id];

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const exercises = new ExercicioDao();
    const result = await exercises.open(teacherData);

    if (result.length === 0) {
      res.render('erro/403', ejs);
    } else {
      ejs.questao = result;

      const files = new ExercicioDao();
      const fileNames = await files.downloadFiles({ id: result[0].id });

      ejs.paths = fileNames;
      res.render('professor/perfil/exercicios/abrirExercicio', ejs);
    }
  } else {
    next();
  }
});

exports.downloadExercice = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = [req.params.id_exercicio, req.params.file_name];

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const exercises = new ExercicioDao();
    const downloadFilesName = await exercises.download(entrada);

    if (downloadFilesName.length === 0) {
      res.render('erro/403', ejs);
    } else {
      res.download(`app/uploads/${downloadFilesName[0].file_name}`);
    }
  } else {
    next();
  }
});

exports.deleteExercise = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = { id: req.params.id };

    const fileNames = new ExercicioDao();
    const downloadFilesName = await fileNames.downloadFiles(entrada);

    downloadFilesName.forEach((file) => {
      const path = 'app/uploads/';
      fs.unlinkSync(path + file.file_name);
    });

    const exercise = new ExercicioDao();
    await exercise.delete(entrada);

    res.redirect('/professor/exercicios');
  } else {
    next();
  }
});

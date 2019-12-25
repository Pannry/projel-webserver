const asyncHandler = require('../../middlewares/async');
const TurmaDao = require('../../infra/banco/TurmaDao');

// @Turmas
exports.classrooms = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_professor: req.user.id,
    };

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const classrooms = new TurmaDao();
    const result = await classrooms.find(entrada);


    ejs.listaSala = result;
    // TODO: será que não precisa apenas passar 'result'?
    res.render('professor/perfil/turmas/turmas', ejs);
  } else {
    next();
  }
});

exports.getCreateClassroom = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    res.render('professor/perfil/turmas/criarTurma', ejs);
  } else {
    next();
  }
});

exports.postCreateClassroom = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      nome: req.body.nome,
      semestre: req.body.semestre,
      id_professor: req.user.id,
      comentario: '',
      cod_sala: Date.now().toString().substring(3, 13),
    };

    const classrooms = new TurmaDao();
    await classrooms.create(entrada);
    res.redirect('/professor/turmas');
  } else {
    next();
  }
});

exports.getOpenClassroomStudentList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const id_sala = req.params.id;

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      idSala: req.params.id,
    };

    const classrooms = new TurmaDao();
    const classInformation = await classrooms.find({ id: id_sala });

    ejs.infoProfessor = classInformation;

    const studentsList = new TurmaDao();
    const result = await studentsList.listarAlunos({ id_sala });

    ejs.listaDeAlunos = result;

    if (classInformation.length !== 0) {
      if (classInformation[0].id_professor === req.user.id) {
        res.render('professor/perfil/turmas/abrirTurmaProfessor', ejs);
      } else {
        res.render('erro/403', ejs);
      }
    }
  } else {
    next();
  }
});

exports.IncludeStudentInClassroom = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_sala: req.params.id,
      id_aluno: Object.keys(req.body)[0],
    };

    const classroom = new TurmaDao();
    await classroom.includeStudent(entrada);

    res.redirect(`/professor/turma/abrir/${entrada.id_sala}/professor`);
  } else {
    next();
  }
});

exports.getOpenClassroomDetails = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const id = req.params.id;

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      idSala: req.params.id,
    };

    const classrooms = new TurmaDao();
    const room = await classrooms.find({ id });

    ejs.infoProfessor = room;

    // const exerciseList = new ExerciseDao();
    // const elist = await exercise.mostrarExerciciosInclusos({ id });

    ejs.lista = []; // ejs.lista = elist;

    // const didacticDaoList = new DidacticDao();
    // const dlist = await exercise.mostrarDidaticosInclusosNaSala({ id });

    ejs.didatico = []; // ejs.didatico = dlist;

    if (room.length !== 0) {
      if (room[0].id_professor === req.user.id) {
        res.render('professor/perfil/turmas/abrirTurmaAluno', ejs);
      } else {
        res.render('erro/403', ejs);
      }
    }
  } else {
    next();
  }
});

exports.postCommentInDetails = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id: {
        id: req.params.id,
      },
      com: {
        comentario: req.body.comentario,
      },
    };

    const classrooms = new TurmaDao();
    await classrooms.editComment(entrada);
    res.redirect(`/professor/turma/abrir/${entrada.id.id}/aluno`);
  } else {
    next();
  }
});

exports.getIncludeExerciseList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    //
  } else {
    next();
  }
});

exports.postIncludeExerciseList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    //
  } else {
    next();
  }
});

exports.getIncludeDidacticList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    //
  } else {
    next();
  }
});

exports.postIncludeDidacticList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    //
  } else {
    next();
  }
});

exports.deleteClassroom = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const classroom = new TurmaDao();
    await classroom.delete({ id: req.params.id });
    res.redirect('/professor/turmas');
  } else {
    next();
  }
});

const asyncHandler = require('../../middlewares/async');
const NotasDAO = require('../../infra/banco/NotasDAO');

exports.professorGET = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_sala: req.params.id_sala,
      id_aluno: req.params.id_aluno,
    };

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      id_sala: req.params.id_sala,
      id_aluno: req.params.id_aluno,
    };

    const notas = new NotasDAO();
    const listas = await notas.list({ id_sala: req.params.id_sala });

    ejs.lista = listas;
    const promiseList = [];

    ejs.lista.forEach(async (element) => {
      const returnPromise = new Promise(async (resolve) => {
        const criarNotas = {
          id_sala: req.params.id_sala,
          id_aluno: req.params.id_aluno,
          id_lista: element.id_lista,
        };
        const checkGrades = new NotasDAO();

        const a = Object.entries(criarNotas);
        const grades = [];
        a.map(key => grades.push({ [key[0]]: key[1] }));

        const alreadyExists = await checkGrades.checkGradeCreated(grades);
        if (alreadyExists.length === 0) {
          const grade = new NotasDAO();
          await grade.create(criarNotas);
        }
        resolve();
      });
      promiseList.push(returnPromise);
    });
    await Promise.all(promiseList);

    const conexaoDb2 = new NotasDAO();
    const NotasDAO2 = await conexaoDb2.showEnrolledStudent(entrada);
    ejs.notas = NotasDAO2;

    console.log('====ejs====');
    console.log(ejs);

    res.render('professor/perfil/notas/AbrirNotasAluno', ejs);
  } else {
    next();
  }
});

exports.post = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_sala: req.params.id_sala,
      id_aluno: req.params.id_aluno,
      id_lista: req.params.id_lista,
    };
    const ejs = {
      sala: req.params.id_sala,
      aluno: req.params.id_aluno,
      nota: req.body.nota,
    };

    entrada.nota = req.body.nota;

    const notas = new NotasDAO();
    await notas.update(entrada);
    res.redirect(`/professor/turma/abrir/${ejs.sala}/professor/${ejs.aluno}`);
  } else {
    next();
  }
});

exports.verRespostas = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_aluno: req.params.id_aluno,
      id_lista: req.params.id_lista,
      id_sala: req.params.id_sala,
    };
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      id_sala: req.params.id_sala,
      id_aluno: req.params.id_aluno,
      id_lista: req.params.id_lista,
    };

    const notas = new NotasDAO();
    const listas = await notas.showAwnser(entrada);
    ejs.respostas = listas;
    res.render('professor/perfil/notas/mostrarExerciciosLista', ejs);
  } else {
    next();
  }
});

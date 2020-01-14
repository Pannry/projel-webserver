const asyncHandler = require('../../middlewares/async');
const ListDao = require('../../infra/banco/ListaDao');
const ExercicioDao = require('../../infra/banco/ExercicioDao');

// @Turmas
exports.getLists = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const list = new ListDao();
    const result = await list.list({ id_professor: req.user.id });

    ejs.lista = result;
    res.render('professor/perfil/exercicios/lista', ejs);
  } else {
    next();
  }
});

exports.openList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const listInfo = [
      { id_professor: req.user.id },
      { id: req.params.id },
    ];

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      id: req.params.id,
    };

    const list = new ListDao();
    const result = await list.list(listInfo);

    if (result.length === 0) res.render('erro/403', ejs);
    else {
      ejs.lista = result;
      res.render('professor/perfil/exercicios/abrirListaInfo', ejs);
    }
  } else {
    next();
  }
});

exports.showQuestions = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      id: req.params.id,
    };

    const list = new ListDao();
    const result = await list.showQuestions({ id_lista: req.params.id });

    ejs.exercicios = result;
    res.render('professor/perfil/exercicios/abrirListaExercicios', ejs);
  } else {
    next();
  }
});

exports.getCreateList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    res.render('professor/perfil/exercicios/criarLista', ejs);
  } else {
    next();
  }
});

exports.postCreateList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_professor: req.user.id,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      tipo: req.body.tipoDeLista,
    };

    const list = new ListDao();
    const result = await list.create(entrada);
    res.redirect(`/professor/exercicios/lista/abrir/${result.insertId}/editar`);
  } else {
    next();
  }
});

exports.deleteList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const list = new ListDao();
    await list.delete({ id: req.params.id });
    res.redirect('/professor/exercicios/lista');
  } else {
    next();
  }
});

exports.getAddQuestionsInList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      user_id: req.user.id,
      page_name: req.path,
      accountType: req.user.tipo,
      id_lista: req.params.id,
    };

    const exercises = new ExercicioDao();
    const result = await exercises.list({ id_professor: req.user.id });

    ejs.lista = result;
    res.render('professor/perfil/exercicios/adicionarExercicios', ejs);
  } else {
    next();
  }
});

exports.postAddQuestionsInList = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const checkbox = req.body.options;
    let questoes = [];
    if (!Array.isArray(checkbox)) questoes = Array.of(checkbox);
    else questoes = checkbox;

    if (checkbox !== undefined) {
      const promiseList = [];
      questoes.forEach(async (element) => {
        const returnPromise = new Promise(async (resolve) => {
          const list = new ListDao();
          const entrada = {
            id_lista: req.params.id,
            id_exercicios: element,
          };

          await list.addQuestion(entrada);
          resolve();
        });
        promiseList.push(returnPromise);
      });
      await Promise.all(promiseList);
    }
    res.redirect('/professor/exercicios/lista');
  } else {
    next();
  }
});

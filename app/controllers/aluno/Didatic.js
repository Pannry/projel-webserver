const asyncHandler = require('../../middlewares/async');
const DidaticoDAO = require('../../infra/banco/DidaticoDAO');

exports.donwload = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'aluno') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const didactic = new DidaticoDAO();
    const result = await didactic.download(req.params.path);

    if (result.length === 0) {
      res.render('erro/403', ejs);
    } else {
      res.download(`app/uploads/${result[0].file_name}`);
    }
  } else next();
});

exports.list = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'aluno') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
      sala: req.params.id_sala,
      didatico: req.params.id_didatico,
    };

    const entrada = {
      id_didatico: req.params.id_didatico,
    };

    let didactic = new DidaticoDAO();
    let result = await didactic.list({ id: entrada.id_didatico });

    ejs.didatico = result;

    didactic = new DidaticoDAO();
    result = await didactic.downloadPaths(result[0].id);

    ejs.paths = result;
    res.render('aluno/perfil/didatico/abrirDidaticoAluno', ejs);
  } else next();
});

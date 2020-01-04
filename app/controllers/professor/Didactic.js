const asyncHandler = require('../../middlewares/async');
const DidaticoDAO = require('../../infra/banco/DidaticoDAO');
const fs = require('fs');

// @Didatico
exports.getDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const didactic = new DidaticoDAO();
    const result = await didactic.list({ id_professor: req.user.id });

    ejs.listaDidatico = result;

    res.render('professor/perfil/didatico/didatico', ejs);
  } else {
    next();
  }
});

exports.openDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = [
      { id: req.params.id },
      { id_professor: req.user.id },
    ];

    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };

    const openDidactic = new DidaticoDAO();
    const result = await openDidactic.list(entrada);

    if (result.length === 0) {
      res.render('erro/403', ejs);
    } else {
      ejs.conteudo = result;


      const didactic = new DidaticoDAO();
      const downloadPaths = await didactic.downloadPaths({ id: result[0].id });

      ejs.paths = downloadPaths;
      res.render('professor/perfil/didatico/abrirDidatico', ejs);
    }
  } else {
    next();
  }
});

exports.deleteDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = { id: req.params.id };
    const didacticPaths = new DidaticoDAO();
    const downloadFilesName = await didacticPaths.downloadPaths(entrada);

    downloadFilesName.forEach((file) => {
      const path = 'app/uploads/';
      fs.unlinkSync(path + file.file_name);
    });

    const didactic = new DidaticoDAO();
    await didactic.delete(entrada);

    res.redirect('/professor/didatico');
  } else {
    next();
  }
});

exports.downloadDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
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
  } else {
    next();
  }
});

exports.getCreateDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const ejs = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };
    res.render('professor/perfil/didatico/criarDidatico', ejs);
  } else {
    next();
  }
});

exports.postCreateDidactic = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const entrada = {
      id_professor: req.user.id,
      titulo: req.body.titulo,
      descricao: req.body.descricao,
    };
    const createDidactic = new DidaticoDAO();
    const result = await createDidactic.create(entrada);

    const promiseList = [];

    req.files.forEach((element) => {
      const returnPromise = new Promise(async (resolve) => {
        const didacticData = {
          id: result.insertId, // retorna a PRIMARY KEY do INSERT anterior
          file_name: element.filename,
        };
        const addMaterial = new DidaticoDAO();
        await addMaterial.addMaterial(didacticData);
        resolve();
      });
      promiseList.push(returnPromise);
    });

    await Promise.all(promiseList);

    res.redirect('/professor/didatico');
  } else {
    next();
  }
});

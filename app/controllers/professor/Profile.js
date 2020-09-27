const asyncHandler = require('../../middlewares/async');
const InstituicaoDAO = require('../../infra/banco/InstituicaoDAO');
const passport = require('passport');

// @Cadastro
exports.getCreate = asyncHandler(async (req, res) => {
  const params = {
    message: req.flash('signupMessage'),
    signupLink: process.env.TSECRET_SIGNUP,
  };

  const places = new InstituicaoDAO();
  const result = await places.listar();

  // TODO: Err de toda a app
  // if (!result)
  //   return next(new ErrorResponse(`algum problema aconteceu`, 404));

  params.listaDeInstituicao = result;

  res.render('professor/signup', params);
});

exports.postCreate = passport.authenticate('local-signup-professor', {
  successRedirect: '/professor/profile',
  failureRedirect: '/professor/cadastro',
  failureFlash: true,
});

// @Login
exports.getLogin = asyncHandler(async (req, res) => {
  res.render('professor/login', { message: req.flash('loginMessage') });
});

exports.postLogin = passport.authenticate('local-login-professor', {
  successRedirect: '/professor/profile',
  failureRedirect: '/professor/login',
  failureFlash: true,
});

// @profile
exports.getProfile = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const params = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };
    res.render('professor/perfil/perfil', params);
  } else next();
});

// @profileUpdate
exports.getUpdateProfile = asyncHandler(async (req, res, next) => {
  if (req.user.tipo === 'professor') {
    const params = {
      user: req.user,
      page_name: req.path,
      accountType: req.user.tipo,
    };
    res.render('professor/perfil/atualizarPerfil', params);
  } else next();
});


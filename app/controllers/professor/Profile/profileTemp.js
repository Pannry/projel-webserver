const asyncHandler = require('../../../middlewares/async');
const InstituicaoDAO = require('../../../infra/banco/InstituicaoDAO');
const passport = require('passport');

exports.getCreate = asyncHandler(async (req, res, next) => {
  const params = {
    message: req.flash('signupMessage'),
    signupLink: process.env.TSECRET_SIGNUP,
  };

  const places = new InstituicaoDAO();
  const result = await places.listar({});

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

exports.getLogProf = asyncHandler(async (req, res, next) => {
  res.render('professor/login', { message: req.flash('loginMessage') });
});

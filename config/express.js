const express = require('express');
const consign = require('consign');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const errorHandler = require('../app/middlewares/erro');

require('dotenv').config();

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || 3000);

  app.set('view engine', 'ejs');

  app.set('views', './app/views');

  app.use(express.static('./public'));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.set('passport', passport);

  // app.use(connMiddleware(pool));

  consign({ cwd: 'app', verbose: false })
    .include('controllers')
    .then('utils')
    .then('infra')
    .then('routes')
    .into(app);

  errorHandler(app);

  return app;
};

const express = require('express');
const consign = require('consign');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const middlewareErro = require('../app/middlewares/erro');

require('dotenv').config()
// const pool = require('../app/middlewares/poolConnection');
// const connMiddleware = require('../app/middlewares/connectionMiddleware');

module.exports = () => {
  const app = express();

  app.set('port', 3000);

  app.set('view engine', 'ejs');

  app.set('views', './app/views');

  app.use(express.static('./public'));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    // https://github.com/expressjs/session
    // cookie de 30 min
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
    secret: 'keyboard dog',
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
    .then('infra')
    .then('routes')
    .into(app);

  middlewareErro(app);

  return app;
};

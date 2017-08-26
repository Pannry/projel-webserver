var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');

module.exports = function () {
    var app = express();

    app.set('port', 3000);

    app.set('view engine', 'ejs');

    app.set('views', './app/views');

    app.use(express.static('./public'));
    
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(express.session({ secret: 'keyboard cat' }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.set('passport', passport);

    load('routes', { cwd: 'app' })
        .then('infra')    
        .into(app);

    return app;
};

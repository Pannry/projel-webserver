var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function () {
    var app = express();

    // criando variavel 'port' e salvando dentro de 'var app'
    app.set('port', 3000);

    // definindo que o tipo de visualização front-end sera 'ejs'
    app.set('view engine', 'ejs');

    // caminho de views
    app.set('views', './views');

    return app;
};
/**
 * Modulo para configurar as rotas de erros
 */

module.exports = function (app) {
    // 404
    app.use(function (req, res) {
        res.status(404).render('erro/404', {accountType: ''});
    });

    app.use(function (err, req, res, next) {
        if(err) console.error(err);
        res.status(500).render('erro/500', {accountType: ''});
    });
}
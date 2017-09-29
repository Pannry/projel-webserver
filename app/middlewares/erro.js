/**
 * Modulo para configurar as rotas de erros
 */

module.exports = function (app) {
    // 404
    app.use(function (req, res) {
        res.status(404).render('erro/404', {accountType: ''});
    });
}
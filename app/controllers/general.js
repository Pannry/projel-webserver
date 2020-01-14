const asyncHandler = require('../middlewares/async');

exports.logout = asyncHandler(async (req, res) => {
  req.logout();
  res.redirect('/');
});

exports.index = asyncHandler(async (req, res) => {
  (req.user === undefined) ?
    res.render('index', { accountType: '' }) :
    res.render('index', { accountType: req.user.tipo });
});

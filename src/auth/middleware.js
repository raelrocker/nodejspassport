module.exports = (req, res, next) => {
    if (req.isAuthenicated()) return next();
    return res.redirect('/auth');
}
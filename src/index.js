module.exports = (app) => {
    app.use('/', require('./controllers/main/index'))
}
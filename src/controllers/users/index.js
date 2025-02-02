const express = require('express');
const router = express.Router();
const isAuth = require('../../auth/middleware');

module.exports = (passport) => {
    router.get('/', isAuth, require('./all'));
    //router.post('/', require('./create'));
    router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/users'
    }));
    router.get('/new', isAuth, require('./new'));
    router.delete('/:id', isAuth, require('./remove'));

    return router;
}
const express = require('express');
const router = express('router');
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('./partials/login', {messages: res.locals.messages()});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/gallery/new',
    failureRedirect: '/create',
    failureFlash: "Can't find user... Please try again!",
    successFlash: "Successfully logged in!"
}));

module.exports = router;
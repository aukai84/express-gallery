const express = require('express');
const router = express('router');
const passport = require('passport');

function checkPassword(password) {
    bcrypt.compare(password, hash, function(err, res) {
    // res == true
    return res;
    });
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
    });

}

router.get('/', (req, res) => {
    res.render('./partials/login', {messages: res.locals.messages()});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/create',
    failureFlash: "Can't find user... Please try again!",
    successFlash: "Successfully logged in!"
}));

module.exports = router;
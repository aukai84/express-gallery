const express = require('express');
const router = express('router');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let db = require('../models');
let User = db.User;

router.get('/', (req, res) => {
    res.render('./partials/create', {messages: res.locals.messages()});
});

router.post('/', (req, res) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            User.create({
                username: req.body.username,
                password: hash
            })
            .then(user => {
                req.flash("message", "User created!  Please login!");
                res.redirect(303, '/login');
            });
         });
    });
});

module.exports = router;
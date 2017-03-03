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
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user){
            req.flash("error", "User already exists!");
            res.redirect(303, '/create');
        } else {
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
        }
    })
    .catch( error => {
        req.flash("error", "Error creating user...try again");
        res.redirect(303, '/create');
    });

});

module.exports = router;
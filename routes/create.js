const express = require('express');
const router = express('router');

let db = require('../models');
let User = db.User;

router.get('/', (req, res) => {
    res.render('./partials/create');
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        req.flash("message", "User created!  Please login!");
        res.redirect(303, '/login');
    });
});

module.exports = router;
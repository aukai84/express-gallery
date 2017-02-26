const express = require('express');
const router = express('router');
const isAuthenticated = require('../public/js/modules.js').isAuthenticated;
const displayError = require('../public/js/modules.js').displayError;

let db = require('../models');
let Photo = db.Photo;
let User = db.User;

router.get('/', (req, res) => {
    Photo.findAll({
        order: "id",
        where: {
            posted_by: req.user.id
        }
    })
    .then( photos => {
        let username = req.user.username;
        res.render('index', {photos, username, messages: res.locals.messages()});
    });
});

module.exports = router;
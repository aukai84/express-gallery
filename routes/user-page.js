const express = require('express');
const router = express('router');
const isAuthenticated = require('../public/js/modules.js').isAuthenticated;
const displayError = require('../public/js/modules.js').displayError;

let db = require('../models');
let Photo = db.Photo;
let User = db.User;

router.get('/', isAuthenticated, (req, res) => {
    Photo.findAll({
        order: "id",
        include: {
            model: User,
            as: 'user'
        },
        where: {
            posted_by: req.user.id
        }
    })
    .then( photos => {
        let username = req.user.username;
        res.render('./partials/user-page', {photos, username: req.body.username, admin: req.body.admin, messages: res.locals.messages()});
    });
});

module.exports = router;
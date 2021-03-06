const express = require('express');
const router = express('router');
const displayError = require('../public/js/modules.js').displayError;

let db = require('../models');
let Photo = db.Photo;
let User = db.User;

router.get('/', (req, res) => {
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
        res.render('./partials/user-page', {photos, username: req.body.user, admin: req.body.admin, messages: res.locals.messages()});
    });
});

module.exports = router;
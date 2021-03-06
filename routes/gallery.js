const express = require('express');
const router = express('router');
const displayError = require('../public/js/modules.js').displayError;

let db = require('../models');
let Photo = db.Photo;

router.get('/', (req, res) => {
    res.redirect(303, '/');
});

router.post('/', (req, res) => {
    Photo.create({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description,
        shortLink: req.body.link.replace(/^https?:\/\//,''),
        posted_by: req.user.id
    })
    .then((photo) => {
        res.redirect(303, '/user-page');
    })
    .catch(error => {
        displayError(req, res, error);
        res.redirect(303, '/gallery/new');
    });
});

router.put('/:id', (req, res) => {
    Photo.update({
        author: req.body.author,
         link: req.body.link,
         description: req.body.description,
         shortLink: req.body.link.replace(/^https?:\/\//,'')
        },{
            where: {
            id: req.params.id
            }
        })
    .then(result => {
        res.redirect(303, `/gallery/${req.params.id}`);
    })
    .catch(error => {
        displayError(req, res, error);
        res.redirect(303, `/gallery/${req.params.id}/edit`);
    });
});

router.delete('/:id', (req, res) => {
    Photo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.redirect(303, '/user-page');
    })
    .catch(error => {
        req.flash("error", "Can't delete message...");
        res.redirect(303, '/user-page');
    });
});

router.get('/new', (req, res) => {
    res.render('./partials/new-photo', { username: req.body.user, admin: req.body.admin, messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        Photo.findAll({
            where: {
                id: {
                    $ne: req.params.id
                }
            }
        })
        .then(photos => {
            res.render('./partials/photo', {photo, photos, username: req.body.user, admin: req.body.admin, messages: res.locals.messages()});

        });
    });
});

router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        if(req.user.id === photo.posted_by || req.user.username === "admin"){
            res.render('./partials/edit-photo', {photo, username: req.body.user, admin: req.body.admin, messages: res.locals.messages()});
        } else {
            req.flash("error", "You can only edit your own photos...");
            res.redirect(303, '/');
        }
    });
});

module.exports = router;
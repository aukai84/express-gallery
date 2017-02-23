const express = require('express');
const router = express('router');
const isAuthenticated = require('../public/js/modules.js').isAuthenticated;

let db = require('../models');
let Photo = db.Photo;

function displayError(req, res, error) {
    for(let i = 0; i < error.errors.length; i++){
        req.flash("error", error.errors[i].message);
    }
}

router.post('/', isAuthenticated, (req, res) => {
    Photo.create({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description,
        shortLink: req.body.link.replace(/^https?:\/\//,'')
    })
    .then((photo) => {
        res.redirect(303, '/');
    })
    .catch(error => {
        displayError(req, res, error);
        res.redirect(303, '/gallery/new');
    });
});

router.put('/:id', isAuthenticated, (req, res) => {
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

router.delete('/:id', isAuthenticated, (req, res) => {
    Photo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.redirect(303, '/');
    })
    .catch(error => {
        console.log(error);
    });
});

router.get('/new', isAuthenticated, (req, res) => {
    res.render('./partials/new-photo', {messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/photo', {photo, messages: res.locals.messages()});
    });
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/edit-photo', {photo, messages: res.locals.messages()});
    });
});

module.exports = router;
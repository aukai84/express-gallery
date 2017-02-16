const express = require('express');
const router = express('router');

let db = require('../models');
let Photo = db.Photo;

function displayError(req, res, error) {
    for(let i = 0; i < error.errors.length; i++){
        req.flash("error", error.errors[i].message);
    }
}

router.post('/', (req, res) => {
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
        // console.log(err.errors[0].message);
        console.log(error.errors[0].message)
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
    });
});

router.delete('/:id', (req, res) => {
    Photo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        res.redirect(303, '/');
    });
});

router.get('/new', (req, res) => {
    res.render('./partials/new-photo', {messages: res.locals.messages()});
});

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/photo', {photo, messages: res.locals.messages()});
    });
});

router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/edit-photo', {photo, messages: res.locals.messages()});
    });
});

module.exports = router;
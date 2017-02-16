const express = require('express');
const router = express('router');

let db = require('../models');
let Photo = db.Photo;

router.post('/', (req, res) => {
    Photo.create({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description,
        shortLink: req.body.link.replace(/^https?:\/\//,'')
    })
    .then((photo) => {
        res.redirect(303, '/');
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
    res.render('./partials/new-photo');
});

router.get('/:id', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/photo', {photo});
    });
});

router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id)
    .then((photo) => {
        res.render('./partials/edit-photo', {photo});
    });
});

module.exports = router;
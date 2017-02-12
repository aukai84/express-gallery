const express = require('express');
const router = express('router');

let db = require('../models');
let Photo = db.Photo;

router.post('/', (req, res) => {
    Photo.create({
        author: req.body.author,
        link: req.body.link,
        description: req.body.description
    })
    .then((photo) => {
        res.json(photo);
    });
});

router.get('/:id', (req, res) => {
    Photo.findAll({
        where: {
            id: req.params.id
        }
    })
    .then((photo) => {
        res.json(photo);
    });
});

router.delete('/:id', (req, res) => {
    Photo.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        console.log(result);
        res.json("success");
    });
});


module.exports = router;
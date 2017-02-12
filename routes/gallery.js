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




module.exports = router;
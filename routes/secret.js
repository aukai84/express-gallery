const express = require('express');
const router = express('router');

router.get('/', (req, res) => {
    res.json("got to secret boo");
});

module.exports = router;
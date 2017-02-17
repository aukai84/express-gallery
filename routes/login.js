const express = require('express');
const router = express('router');

router.get('/', (req, res) => {
    res.render('./partials/login');
});


module.exports = router;
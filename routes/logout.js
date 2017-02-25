const express = require('express');
const router = express('router');

router.get('/', (req, res) => {
    req.logout();
    req.flash("message", "Successfully logged out..");
    res.redirect(303, '/');
});


module.exports = router;
const express = require('express');
const router = express('router');

const User = require('../models').User;



router.get('/', (req, res) => {
    let username = req.user.username;
    console.log(username);
    User.findAll({
        where: {
            username: {
                $ne: "admin"
            }
        }
    })
    .then( users => {
        console.log(users)
        res.render('./partials/admin-page', {users, username: req.body.user, admin: req.body.admin});
    });
});


module.exports = router;
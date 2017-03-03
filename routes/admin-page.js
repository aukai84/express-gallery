const express = require('express');
const router = express('router');

const User = require('../models').User;

function isAdmin(req, res, next) {
    if(req.user){
        if(req.user.username === "admin"){
            next();
        } else {
            res.redirect(303, '/');
        }
    } else {
        res.redirect(303, '/');
    }
}

router.get('/', isAdmin, (req, res) => {
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
        res.render('./partials/admin-page', {users, username});
    });
});


module.exports = router;
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        console.log('NOPE BRAH');
        res.redirect('/login');
    }
}




module.exports = {
    isAuthenticated
};
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        console.log('NOPE BRAH');
        req.flash("error", "You do not have access.. please log in...");
        res.redirect('/login');
    }
}




module.exports = {
    isAuthenticated
};
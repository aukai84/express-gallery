function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        console.log('NOPE BRAH');
        req.flash("error", "You do not have access.. please log in...");
        res.redirect('/login');
    }
}

function displayError(req, res, error) {
    for(let i = 0; i < error.errors.length; i++){
        req.flash("error", error.errors[i].message);
    }
}


module.exports = {
    isAuthenticated,
    displayError
};
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

function setUser(req, res, next) {
    if(req.user){
        if(req.user.username === "admin"){
            req.body.admin = true;
        } else {
            req.body.admin = null;
        }
        req.body.user = req.user.username;
    } else {
        req.body.user= null;
    }
    next();
}

module.exports = {
    isAuthenticated,
    displayError,
    setUser
};
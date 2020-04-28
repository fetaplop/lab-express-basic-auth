function loginCheck(req, res, next) {
    if (req.session.currentUser) {
        //so if user is authenticated
        next();

    } else {
        res.redirect("auth/login");
    }
}

module.exports = loginCheck;
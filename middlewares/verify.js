module.exports = {
    isLogin: (req, res, next) => {
        if(req.session.loggedin === true){
            next();
            return;
        } else {
            req.session.destroy((err) => {
                res.redirect('/login');
            })
        }
    },
    loggedIn: (req, res, next) => {
        if(req.session.loggedin === true){
            return res.redirect('/');
        }
        next()
    }
};
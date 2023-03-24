// this file is for the withAuth helper function, with require the user to log in to use the app

const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;
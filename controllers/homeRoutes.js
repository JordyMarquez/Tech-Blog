// the purpose of this file is to finish path end points; use .get, .render, .post to put info into database

const router = require('express').Router();
const { Blogpost, User } = require('../models');
const withAuth = require('../utils/auth');

// get all blogposts for the homepage
router.get('/', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findAll({
            include: [ { model: User} ],
        });
    
        const blogPosts = blogpostData.map((blogPost) => blogPost.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get blogposts by id's on the homepage
router.get('/blogpost/:id', async (req, res) => {
   try {
     const blogpostData = await Blogpost.findByPk(req.params.id, {
        include: [{ model: User}]
    });

    const blogPost = blogpostData.get({ plain: true});

    res.render('blogpost', {
        ...blogPost,
        loggedIn: req.session.loggedIn
    });
} catch (err) {
    res.status(500).json(err);
}
});

// as long as user is logged in, get access to the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{ model: Blogpost}],
        });

        const user = userData.get({ plain: true});

        res.render('dashboard', {
            ...user, 
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get('/homepage', async (req, res) => {
//     try {
//         const blogpostData = await Blogpost.findAll( {
//             include: [{model: User}],
//         });

//         res.render(
//         )
//     }
// });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;
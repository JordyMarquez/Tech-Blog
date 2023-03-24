// const router = require('express').Router();
// const { Blogpost, User, Comment} = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//     try {
//         const blogpostData = await Blogpost.findAll({
//             include: [ { model: User} ],
//         });
    
//         const blogPosts = blogpostData.map((blogPost) => blogPost.get({ plain: true }));

//         res.render('homepage', {
//             blogPosts,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
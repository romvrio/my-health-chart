const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Test, User, Comment } = require('../models');

router.get('/', (req, res) => {
    // console.log(req.session);

    
    res.render('homepage', {
        loggedIn: req.session.loggedIn
      });
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });  
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;
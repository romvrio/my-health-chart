const router = require('express').Router();
const sequelize = require('../config/connection');
const { Test, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    
    Test.findAll({
      attributes: [
        'id',
        'test_url',
        'title',
        'created_at',
        'test_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'test_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbTestData => {
        const tests = dbTestData.map(test => test.get({ plain: true }));
        res.render('chart', {
            tests,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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

  router.get('/test/:id', (req, res) => {
    Test.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'test_url',
        'title',
        'created_at',
        'test_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'test_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbTestData => {
        if (!dbTestData) {
          res.status(404).json({ message: 'No test found with this id' });
          return;
        }
  
        // serialize the data
        const test = dbTestData.get({ plain: true });
  
        // pass data to template
        res.render('single-test', {
            test,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
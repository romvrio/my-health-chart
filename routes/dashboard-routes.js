const router = require('express').Router();
const sequelize = require('../config/connection');
const { Test, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// display all tests on dashboard
router.get("/", withAuth, (req, res) => {
    Test.findAll({
        where: {
           user_id: req.session.user_id
        },
        attributes: [
            'id', 
            'title',
            'created_at', 
            'test_content'
        ],
        // order: [['created_at', 'DESC']],
        include: [
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'test_id', 'user_id', 'created_at'],
              include: {
                  model:User,
                  attributes: ['username']
              }
          },
          {
              model: User,
              attributes: ['username']
          }
        ]
    })
        .then((dbTestData) => {
            const tests = dbTestData.map(test => test.get({ plain: true }));
            res.render('dashboard', { tests, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// display one test in dashboard for details 
router.get('/edit/:id', withAuth, (req, res) => {
    Test.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
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

        res.render('edit-test', {
            test,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// create/pick test 

router.get('/create/', withAuth, (req, res) => {
    Test.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
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
        // serialize data before passing to template
        const tests = dbTestData.map(test => test.get({ plain: true }));
        res.render('create-test', { tests, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
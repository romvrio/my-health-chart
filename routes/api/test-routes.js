const router = require('express').Router();
const { Test, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all tests
router.get('/', (req, res) => {
    console.log('======================');
    Test.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'test_content'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
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
        },
      ]
    })
      .then(dbTestData => res.json(dbTestData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
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
        // include the Comment model here:
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'test_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbTestData => {
        if (!dbTestData) {
          res.status(404).json({ message: 'No test found with this id' });
          return;
        }
        res.json(dbTestData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Test.create({
      title: req.body.title,
      test_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(dbTestData => res.json(dbTestData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Test.update({
        title: req.body.title,
        test_content: req.body.test_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbTestData => {
        if (!dbTestData) {
          res.status(404).json({ message: 'No test found with this id' });
          return;
        }
        res.json(dbTestData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Test.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbTestData => {
        if (!dbTestData) {
          res.status(404).json({ message: 'No test found with this id' });
          return;
        }
        res.json(dbTestData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;





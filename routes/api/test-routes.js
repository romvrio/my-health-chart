const router = require("express").Router();
const { User, Test, Comment } = require("../../models");
const sequalize = require('../config/connection');
const withAuth = require('../../utils/auth');
const { post } = require("./user-routes");

// GET /api/tests
router.get("/", (req, res) => {
    Test.findAll({
        attributes: [
            'id', 
            'title', 
            'test_content'
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/tests/1
router.get("/:id", (req, res) => {
    Test.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'title', 
            'Test_content',
            'created_at'
        ],
        include: [
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
                res.status(404).json({ message: 'No test found with this id ' });
                return;
            }
            res.json(dbTestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create/Pick a test
router.post('/', withAuth, (req, res) => {
    Test.create({
        title: req.body.title,
        test_content: req.body.test_content,
        user_id: req.session.user_id
    })
      .then(dbTestData => res.json(dbTestData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// update a test
router.put('/', withAuth, (req, res) => {
    Test.update({
        title: req.body.title,
        test_content: req.body.test_content,
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

// Delete a test
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
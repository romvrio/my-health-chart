const router = require("express").Router();
const { ScreenTest, User } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
    User.findAll({
        attributes: ['id', 'title', 'screenTest_url']
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: ['id', 'title', 'screenTest_url'],
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id ' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

const { Comment } = require('../models');

const commentData = [
    {
        user_id: 2,
        test_id: 1,
        comment_text: "I would like to schedule screening lung CT"
    },
    {
        user_id: 1,
        test_id: 1,
        comment_text: "We will need your smoking history"
    },
    {
        user_id: 2,
        test_id: 3,
        comment_text: "My coronary calcium score was normal 5 years ago"
    },
    {
        user_id: 1,
        test_id: 3,
        comment_text: "You do not need coronary calcium scoring at this time"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

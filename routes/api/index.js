const router = require('express').Router();

const userRoutes = require('./user-routes');
const testRoutes = require('./test-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
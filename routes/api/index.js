const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const testRoutes = require('./test-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
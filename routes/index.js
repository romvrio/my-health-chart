const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes.js');
const chartRoutes = require('./chart-routes');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/chart', chartRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('my_health_chart', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});



module.exports = sequelize;
const Sequelize = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('my_health_chart', 'root', 'Invincible3162!', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});



module.exports = sequelize;
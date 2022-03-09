const { User } = require('../models');

const userData = [
    {
        username: "Doogie",
        password: "Howser"
    },
    {
        username: "John",
        password: "Doe"
    }    
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
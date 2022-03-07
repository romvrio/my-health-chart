const sequelize = require('../config/connection');
const { tests } = require('../models');

const carSeedData = require('./testsSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const tests = await tests.bulkCreate(testsSeedData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();

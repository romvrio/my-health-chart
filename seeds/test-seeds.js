const { Test } = require('../models');

const testData = [
    {
        title: "Screening lung CT",
        test_content: "How can I schedule this test",
        user_id: 2
    },
    {
        title: "Screening lung CT",
        test_content: "Please provide your age, smoking history and contact-info and we will schedule a test and inform you for the date and time",
        user_id: 1
    },
    {
        title: "Mammogram",
        test_content: "I am 35 years old female. Can I schedule mammogram",
        user_id: 2
    },
    {
        title: "Mammogram",
        test_content: "Yes you can schedule a baseline mammogram at 35. But yearly mammogram starts from age 40",
        user_id: 1
    }
]

const seedTests = () => Test.bulkCreate(testData);

module.exports = seedTests;
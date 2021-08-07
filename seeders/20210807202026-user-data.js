'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i <= 1000; i++) {
      users.push({
        id: i,
        name: faker.name.findName(),
        mobile: faker.phone.phoneNumberFormat(0),
        language: i % 5 ? 'english' : 'urdu',
        role: i % 15 ? 'customer' : 'rider'
      });
    }
    return queryInterface.bulkInsert('users', users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

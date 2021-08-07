'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const groups = [];
    for (let i = 1; i <= 50; i++) {
      groups.push({
        id: i,
        name: `Group ${i}`
      });
    }
    return queryInterface.bulkInsert('groups', groups);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  }
};

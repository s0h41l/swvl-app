'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const groups = [];
    for (let i = 1; i <= 50; i++) {
      groups.push({
        id: i,
        name: `Group ${i}`
      });
    }

    return models.group.bulkCreate(groups, { ignoreDuplicates: true }); 
  },
  down: (queryInterface, Sequelize) => {
    return models.group.destroy();
  }
};

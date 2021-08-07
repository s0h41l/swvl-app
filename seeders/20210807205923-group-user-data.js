'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const groupUsers = [];

    for(let i = 0; i < 50; i++){
      for(let j = i*20; j < i*20 + 20; j++){
        groupUsers.push({
          userId: j + 1,
          groupId: i+1
        });
      }
    }

    return queryInterface.bulkInsert('group_users', groupUsers);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('group_users', null, {});
  }
};

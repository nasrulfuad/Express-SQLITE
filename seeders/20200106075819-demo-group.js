'use strict';
const { Group } = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 5; i++) {
      const aso = await Group.create({
        name: faker.name.findName(),
        description: faker.random.words()
      });
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  }
};

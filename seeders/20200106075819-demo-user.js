'use strict';
const { User } = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0; i < 35; i++) {
      const aso = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumberFormat(),
        password: faker.lorem.slug()
      });
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

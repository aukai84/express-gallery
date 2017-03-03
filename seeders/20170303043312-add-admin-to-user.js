'use strict';

const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('password', saltRounds);

module.exports = {
  up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('Users', [{
            username: "admin",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);

  },

  down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('Users', [{
            username: "admin",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
  }
};

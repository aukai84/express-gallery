'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Photos', 'posted_by', {
        type: Sequelize.INTEGER,
        reference: {
            model: 'Users',
            key: 'id'
        }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Photos', 'posted_by');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flight', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      aircraftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      originAirdromeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destinyAirdromeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      flightDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      flightTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flight');
  }
};
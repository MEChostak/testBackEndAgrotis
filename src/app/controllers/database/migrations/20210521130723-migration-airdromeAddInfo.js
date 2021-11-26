'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AirdromeAddInfo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      airdromeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      international: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      requireSlot: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      patioAuthorization: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      hasLighting: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('AirdromeAddInfo');
  }
};
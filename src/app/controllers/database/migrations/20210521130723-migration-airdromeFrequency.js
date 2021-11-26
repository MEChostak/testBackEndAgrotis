'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AirdromeFrequency', {
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
      typeFrequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameFrequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('AirdromeFrequency');
  }
};
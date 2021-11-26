'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AirdromeNavaids', {
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
      typeNavaids: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      designativeNavaids: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      frequencyNavaids: {
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
    return queryInterface.dropTable('AirdromeNavaids');
  }
};
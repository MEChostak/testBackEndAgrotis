'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftGraphicCG', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aircraftGraphicId: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      weight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fs: {
        type: Sequelize.NUMERIC,
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
    return queryInterface.dropTable('AircraftGraphicCG');
  }
};
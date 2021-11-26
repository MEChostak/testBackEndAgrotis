'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftFuel', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aircraftId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      item: {
        type: Sequelize.STRING,
        allowNull: false
      },
      taxiFuel: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fuelConsumption: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fstype: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maxWeight: {
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
    return queryInterface.dropTable('AircraftFuel');
  }
};



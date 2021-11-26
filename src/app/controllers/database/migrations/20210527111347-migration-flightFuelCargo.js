'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FlightFuelCargo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      aircraftFuelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      aircraftFuelCargoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.NUMERIC,
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
    return queryInterface.dropTable('FlightFuelCargo');
  }
};

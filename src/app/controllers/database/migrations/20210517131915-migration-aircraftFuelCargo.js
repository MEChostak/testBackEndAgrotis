'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftFuelCargo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      aircraftFuelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      longitudinalMoment: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      sideMoment: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      itemFsFixed: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fsLongitudinalFixed: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fsLateralFixed: {
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
    return queryInterface.dropTable('AircraftFuelCargo');
  }
};
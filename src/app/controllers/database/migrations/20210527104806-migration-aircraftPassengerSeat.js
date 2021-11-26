
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftPassengerSeat', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aircraftId: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      item: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fsLongitudinal: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      fsLateral: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      weightRestriction: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('AircraftPassengerSeat');
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftCrewMember', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aircraftCrewSeatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('AicradtCrewMember');
  }
};
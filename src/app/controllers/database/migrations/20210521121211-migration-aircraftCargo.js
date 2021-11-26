'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftCargo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      aircraftId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fsLongitudinal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fsSide: {
        type: Sequelize.STRING,
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
  return queryInterface.dropTable('AircraftCargo');
  }
};
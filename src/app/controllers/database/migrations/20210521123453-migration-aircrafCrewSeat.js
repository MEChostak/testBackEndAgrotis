'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AircraftCrewSeat', {
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
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      fsLongitudinal: {
        type: Sequelize.NUMERIC,
        allowNull: false,
        defaultValue: Sequelize.NOW
        },
      fsLateral: {
        type: Sequelize.NUMERIC,
        allowNull: false,
        defaultValue: Sequelize.NOW
        },
      weightRestriction: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.NOW
        },  
      maxWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
return queryInterface.dropTable('AircraftCrewSeat');
  }
};
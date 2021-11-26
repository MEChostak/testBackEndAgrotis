'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FlightCrewMember', {
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
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        },
      aircraftId: {
        type: Sequelize.INTEGER,
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
return queryInterface.dropTable('FlightCrewMember');
  }
};  
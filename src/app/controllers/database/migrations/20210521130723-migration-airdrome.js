'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Airdrome', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iata: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      icao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      typeRegister: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      elevation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      typeReport: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      airdromeId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      report: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('Airdrome');
  }
};
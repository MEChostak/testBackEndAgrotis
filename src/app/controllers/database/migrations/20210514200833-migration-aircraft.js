'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Aircraft', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      airdromeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      certifiedSinglePilot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true
      },
      aircraftType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registration:  {
        type: Sequelize.STRING,
        allowNull: false
      },
      operator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serialNumber: {
        type: Sequelize.NUMERIC,
        allowNull: true
      },
      fuelType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      propulsionType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aircraftUnit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fuelUnit:{
        type: Sequelize.STRING,
        allowNull: false
      },
      baseWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      longitudinalMoment: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      applicableLateralMoment: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      lateralMoment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emptyWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      rampWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      takeoffWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      landingWeight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Aircraft');
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AirdromeRailways', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      airdromeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      /*  */
      designativeRailways: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      length: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      width: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('AirdromeRailways');
  }
};
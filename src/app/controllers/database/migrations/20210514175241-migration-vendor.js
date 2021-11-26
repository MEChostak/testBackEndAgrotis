'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vendor', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airdrome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail24: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone24: {
        type: Sequelize.STRING,
        allowNull: false
      },
      manager: {
        type: Sequelize.STRING,
        allowNull: false
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeInit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeEnd: {
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
    return queryInterface.dropTable('Vendor');
  }
};



'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notification', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // tutorialVideo: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      // openTickets: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // receivedMessages: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // aircraftDocument: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // crewDocument:  {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // passengerDocument: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // signature: {
      //   type: Sequelize.BLOB,
      //   allowNull: false
      // },
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
    return queryInterface.dropTable('Notification');
  }
};
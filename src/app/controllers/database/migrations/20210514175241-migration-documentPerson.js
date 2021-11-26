'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DocumentPerson', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      crewMemberId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passengerId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      typeDoc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numberDoc:  {
        type: Sequelize.STRING,
        allowNull: false
      },
      emitterDoc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emissionDoc: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expireDoc: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      dateExperiDoc: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('DocumentPerson');
  }
};
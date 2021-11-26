'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Person', {
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
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      weight: {
        type: Sequelize.NUMERIC,
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emergencyPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      typePerson: {
        type: Sequelize.STRING,
        allowNull: false,
        // defaultValue: ["piloto", "co-piloto", "passageiro"] 
      },
      // isCrewMember: {
      //   type: Sequelize.BOOLEAN,
      //   allowNull: false
      // },
      // isPassenger:{
      //   type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Person');
  }
};
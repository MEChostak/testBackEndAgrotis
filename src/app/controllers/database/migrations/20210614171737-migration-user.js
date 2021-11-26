'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true  
      },
      organizationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onDelete: 'CASCADE',
        // References: {
        //   model: 'Profile',
        //   key: 'profileId', 
        //   as: 'profile'
        // }
      },
      profileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // onDelete: 'CASCADE',
        // References: {
        //   model: 'Organization',
        //   key: 'organizationId', 
        //   as: 'organization'
        // }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isOwner: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'Yes'
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
    return queryInterface.dropTable('User');
  }
};
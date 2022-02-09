'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ContribList', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            ContribListId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comp: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dtPgto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salContrib: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contrib: {
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
        return queryInterface.dropTable('ContribList');
    }
};
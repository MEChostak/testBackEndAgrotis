'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CustomersReading', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            // contribListId: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            // },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nit: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            birth: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mother: {
                type: Sequelize.STRING,
                allowNull: false
            },
            extract: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contribList: {
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
        return queryInterface.dropTable('CustomersReading');
    }
};
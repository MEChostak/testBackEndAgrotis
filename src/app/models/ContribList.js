'use strict';
const { Model, DataTypes } = require('sequelize');

// @ts-ignore
class ContribList extends Model {
    static init(sequelize) {
        // @ts-ignore
        super.init({
            comp: DataTypes.STRING,
            dtPgto: DataTypes.STRING,
            salContrib: DataTypes.STRING,
            contrib: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        // @ts-ignore
        this.belongsTo(models.CustomersReading, {
            foreignKey: 'customersReadingId',
            as: 'customersReading'
        });
    }
}

module.exports = ContribList;
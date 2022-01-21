'use strict';
const { Model, DataTypes } = require('sequelize')

class PdfList extends Model {
    static init(sequelize) {
        super.init({
            fileName: DataTypes.STRING,
            status: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = PdfList
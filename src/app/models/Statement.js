const { Model, DataTypes } = require('sequelize');

class Statement extends Model {
    static init(sequelize) {
        super.init({
            date: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belengsTo(models.Calc, { foreignKey: 'calcId', as: 'calc' });
    }
}

module.exports = Statement;
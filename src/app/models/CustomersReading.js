const { Model, DataTypes } = require('sequelize');

class CustomersReading extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            nit: DataTypes.STRING,
            cpf: DataTypes.STRING,
            birth: DataTypes.STRING,
            mother: DataTypes.STRING,
            extract: DataTypes.STRING,
            contribList: DataTypes.STRING
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.ContribList, {
            foreignKey: 'contribListId',
            as: 'contribList'
        });
        // this.belongsTo(models.Organization, {
        //     foreignKey: 'organizationId',
        //     as: 'organization'
        // });
    }
}

module.exports = CustomersReading;
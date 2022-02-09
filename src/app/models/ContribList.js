const { Model, DataTypes } = require('sequelize');

class ContribList extends Model {
    static init(sequelize) {
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
        this.belongsTo(models.ContribList, {
            foreignKey: 'ContribListId',
            as: 'contribList'
        });
        // this.belongsTo(models.Organization, {
        //   foreignKey: 'organizationId', as: 'organization'
        // });
    }
}

module.exports = ContribList;
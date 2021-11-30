const { Model, DataTypes } = require('sequelize');

class Table extends Model {
  static init(sequelize) {
    super.init(
      {
        mouth: DataTypes.STRING,
        year: DataTypes.STRING,
        value: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    /* this.belongsTo(models.Profile, {
      foreignKey: 'profileId', as: 'profile'
    });
    this.belongsTo(models.Organization, {
      foreignKey: 'organizationId', as: 'organization'
    }); */
  }
}

module.exports = Table;
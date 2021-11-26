const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        mail: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Profile, {
      foreignKey: 'profileId', as: 'profile'
    });
    this.belongsTo(models.Organization, {
      foreignKey: 'organizationId', as: 'organization'
    });
  }
}

module.exports = User;
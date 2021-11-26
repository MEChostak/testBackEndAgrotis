const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        mail: DataTypes.STRING,
        isOwner: DataTypes.STRING
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
    });
    this.hasMany(models.Notification, { onDelete: 'cascade', hooks: true, foreignKey: 'userId', as: 'notification' });
    // this.belongsTo(models.UserToken, {foreignKey: 'userTokenId', as: 'userToken'}); */
  }
}

module.exports = User;
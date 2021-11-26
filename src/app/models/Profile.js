const { Model, DataTypes } = require('sequelize');

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, {onDelete: 'cascade', hooks:true, foreignKey: 'profileId', as: 'user'});
  }
}

module.exports = Profile;
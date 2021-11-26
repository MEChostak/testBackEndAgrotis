const { Model, DataTypes } = require('sequelize');

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.NUMBER,
        timeCourse: DataTypes.INTEGER
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Organization, {foreignKey: 'planId', as: 'organization'});
  }
}

module.exports = Plan;


const { Model, DataTypes } = require('sequelize');

class Organization extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        paymentStatus: DataTypes.STRING,
        userTest: DataTypes.STRING
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.User, { onDelete: 'cascade', hooks: true, foreignKey: 'organizationId', as: 'user' });
    this.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plan' });
  }
}

module.exports = Organization;
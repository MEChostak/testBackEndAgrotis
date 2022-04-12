const { Model, DataTypes } = require('sequelize');

class Laboratorio extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: DataTypes.INTEGER,
        idLab: DataTypes.INTEGER,
        nomeLab: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = Laboratorio;

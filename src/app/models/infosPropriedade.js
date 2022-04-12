const { Model, DataTypes } = require('sequelize');

class InfosPropriedade extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: DataTypes.INTEGER,
        idInfo: DataTypes.INTEGER,
        nomeInfo: DataTypes.STRING,
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

module.exports = InfosPropriedade;

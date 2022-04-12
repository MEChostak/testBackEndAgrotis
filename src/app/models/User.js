const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        dataInicial: DataTypes.STRING,
        dataFinal: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        observacoes: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Laboratorio, {
      foreignKey: 'userId',
      as: 'laboratorio',
    });
    this.hasMany(models.InfosPropriedade, {
      foreignKey: 'userId',
      as: 'infosPropriedade',
    });
  }
}

module.exports = User;

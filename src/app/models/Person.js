const { Model, DataTypes } = require('sequelize');

class Person extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            birthDate: DataTypes.STRING,
            taxId: DataTypes.STRING,
            motherName: DataTypes.STRING,
            phone: DataTypes.STRING,
            mail: DataTypes.STRING
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.User, { onDelete: 'cascade', hooks: true, foreignKey: 'personId', as: 'user' });
    }
}

module.exports = Person;
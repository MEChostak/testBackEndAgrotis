const { Model, DataTypes } = require('sequelize');

class Calc extends Model {
    static init(sequelize) {
        super.init({
            date: DataTypes.STRING,
        }, {
            sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.User, { onDelete: 'cascade', hooks: true, foreignKey: 'personId', as: 'user' });
    }
}

module.exports = Person;
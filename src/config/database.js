require('dotenv/config');

module.exports = {
  logging: console.log,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
  password: 'senha',
  database: 'smart_aviation',
  /*schema: process.env.DB_SCHEMA,*/
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
      },
  },
  timezone: '-03:00',
  dateStrings: [
    'DATE',
    'DATETIME'
  ],
  define: {
    timestamps: true,
    freezeTableName: true
  },
};
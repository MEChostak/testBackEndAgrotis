import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

/** * Models ** */
import User from '../app/models/User';

// eslint-disable-next-line no-unused-vars
const models = [];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // eslint-disable-next-line prettier/prettier
    this.connection = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

    User.init(this.connection);
    
    /* associate */

    // User.associate(this.connection.models);
    

    // models
    //   .map(model => model.init(this.connection))
    //   .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

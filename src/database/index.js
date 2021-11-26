import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

/** * Models ** */

// import Video from '../app/models/Video';

const models = [];

class Database {
  constructor() {
    this.init();
  }

  init() {

    this.connection = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

    User.init(this.connection);
    
    // Video.init(this.connection);

    
    // Video.associate(this.connection.models); se houver associação

    // User.associate(this.connection.models);

    /*models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));*/
  }
}

export default new Database();

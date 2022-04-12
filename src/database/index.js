import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

/** * Models ** */
import User from '../app/models/User';
import Laboratorio from '../app/models/Laboratorio';
import infosPropriedade from '../app/models/infosPropriedade';

class Database {
    constructor() {
        this.init();
    }

    init() {
        // @ts-ignore
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

        User.init(this.connection);
        Laboratorio.init(this.connection);
        infosPropriedade.init(this.connection);

        /* associate */

        User.associate(this.connection.models);
        Laboratorio.associate(this.connection.models);
        infosPropriedade.associate(this.connection.models);
    }
}

export default new Database();
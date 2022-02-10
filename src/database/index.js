import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

/** * Models ** */
import User from '../app/models/User';
import Organization from '../app/models/Organization';
import Plan from '../app/models/Plan';
import Person from '../app/models/Person';
import Table from '../app/models/Table';
import PdfList from '../app/models/PdfList';
import CustomersReading from '../app/models/CustomersReading';
import ContribList from '../app/models/ContribList';

// eslint-disable-next-line no-unused-vars
// const models = [];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // eslint-disable-next-line prettier/prettier
        // @ts-ignore
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

        User.init(this.connection);
        Organization.init(this.connection);
        Plan.init(this.connection);
        Person.init(this.connection);
        Table.init(this.connection);
        PdfList.init(this.connection);
        CustomersReading.init(this.connection);
        ContribList.init(this.connection);

        /* associate */

        User.associate(this.connection.models);
        Organization.associate(this.connection.models);
        Plan.associate(this.connection.models);
        Person.associate(this.connection.models);
        CustomersReading.associate(this.connection.models);
        ContribList.associate(this.connection.models);
        // models
        //   .map(model => model.init(this.connection))
        //   .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
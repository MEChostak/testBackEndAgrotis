import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

/** * Models ** */
import Aircraft from '../app/models/Aircraft';
import AircraftCargo from '../app/models/AircraftCargo';
import AircraftCrewSeat from '../app/models/AircraftCrewSeat';
import AircraftFuel from '../app/models/AircraftFuel';
import AircraftFuelCargo from '../app/models/AircraftFuelCargo';
import AircraftGraphic from '../app/models/AircraftGraphic';
import AircraftGraphicCG from '../app/models/AircraftGraphicCG';
import AircraftPassengerSeat from '../app/models/AircraftPassengerSeat';
import Airdrome from '../app/models/Airdrome';
import AirdromeAddInfo from '../app/models/AirdromeAddInfo';
import AirdromeRailways from '../app/models/AirdromeRailways';
import AirdromeReport from '../app/models/AirdromeReport';
import AirdromeNavaids from '../app/models/AirdromeNavaids';
import AirdromeFrequency from '../app/models/AirdromeFrequency';
import Person from '../app/models/Person';
import DocumentPerson from '../app/models/DocumentPerson';
import DocumentAircraft from '../app/models/DocumentAircraft';
import Flight from '../app/models/Flight';
import FlightCargo from '../app/models/FlightCargo';
import FlightCrewMember from '../app/models/FlightCrewMember';
import FlightFuelCargo from '../app/models/FlightFuelCargo';
import FlightPassenger from '../app/models/FlightPassenger';
import Organization from '../app/models/Organization';
import Plan from '../app/models/Plan';
import Profile from '../app/models/Profile';
import Aircraft from '../app/models/Aircraft';
import User from '../app/models/User';
// import UserToken from '../app/models/UserToken';
import Notification from '../app/models/Notification';
import Vendor from '../app/models/Vendor';
import Video from '../app/models/Video';
import AirdromeCsvList from '../app/models/AirdromeCsvList';
import AircraftCsvList from '../app/models/AircraftCsvList';
import AirdromeRailwaysCsvList from '../app/models/AirdromeRailwaysCsvList';
import AirdromeFrequencyCsvList from '../app/models/AirdromeFrequencyCsvList';
import AirdromeNavaidsCsvList from '../app/models/AirdromeNavaidsCsvList';

const models = [];

class Database {
  constructor() {
    this.init();
  }

  init() {

    this.connection = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig)

    Airdrome.init(this.connection);
    AirdromeAddInfo.init(this.connection);
    AirdromeCsvList.init(this.connection);
    AirdromeRailways.init(this.connection);
    AirdromeReport.init(this.connection);
    AirdromeRailwaysCsvList.init(this.connection);
    AirdromeFrequency.init(this.connection);
    AirdromeFrequencyCsvList.init(this.connection);
    AirdromeNavaids.init(this.connection);
    AirdromeNavaidsCsvList.init(this.connection);
    AircraftCargo.init(this.connection);
    Aircraft.init(this.connection);
    AircraftCsvList.init(this.connection);
    AircraftCrewSeat.init(this.connection);
    AircraftFuel.init(this.connection);
    AircraftFuelCargo.init(this.connection);
    AircraftGraphic.init(this.connection);
    AircraftGraphicCG.init(this.connection);
    AircraftPassengerSeat.init(this.connection);
    DocumentPerson.init(this.connection);
    DocumentAircraft.init(this.connection);
    Flight.init(this.connection);
    FlightCargo.init(this.connection);
    FlightCrewMember.init(this.connection);
    FlightFuelCargo.init(this.connection);
    FlightPassenger.init(this.connection);
    Organization.init(this.connection);
    Person.init(this.connection);
    Plan.init(this.connection);
    Profile.init(this.connection);
    User.init(this.connection);
    // UserToken.init(this.connection);
    Notification.init(this.connection);
    Vendor.init(this.connection);
    Video.init(this.connection);
    
    Airdrome.associate(this.connection.models);
    AirdromeAddInfo.associate(this.connection.models);
    // AirdromeCsvList.associate(this.connection.models);
    AirdromeRailways.associate(this.connection.models);
    AirdromeReport.associate(this.connection.models);
    AirdromeFrequency.associate(this.connection.models);
    AirdromeNavaids.associate(this.connection.models);
    AircraftCargo.associate(this.connection.models);
    Aircraft.associate(this.connection.models);
    // AircraftCsvList.associate(this.connection.models);
    AircraftCrewSeat.associate(this.connection.models);
    AircraftFuel.associate(this.connection.models);
    AircraftFuelCargo.associate(this.connection.models);
    AircraftGraphic.associate(this.connection.models);
    AircraftGraphicCG.associate(this.connection.models);
    AircraftPassengerSeat.associate(this.connection.models);
    DocumentPerson.associate(this.connection.models);
    DocumentAircraft.associate(this.connection.models);
    Flight.associate(this.connection.models);
    FlightCargo.associate(this.connection.models);
    FlightCrewMember.associate(this.connection.models);
    FlightFuelCargo.associate(this.connection.models);
    FlightPassenger.associate(this.connection.models);
    Organization.associate(this.connection.models);
    Person.associate(this.connection.models);
    Plan.associate(this.connection.models);
    Profile.associate(this.connection.models);
    User.associate(this.connection.models);
    // UserToken.associate(this.connection.models);
    Notification.associate(this.connection.models);
    // Vendor.associate(this.connection.models);
    // Video.associate(this.connection.models);
    
    /*models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));*/
  }
}

export default new Database();

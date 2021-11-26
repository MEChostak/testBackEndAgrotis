"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

var _User = _interopRequireDefault(require("../app/models/User"));

var _Address = _interopRequireDefault(require("../app/models/Address"));

var _Payment = _interopRequireDefault(require("../app/models/Payment"));

var _Establishment = _interopRequireDefault(require("../app/models/Establishment"));

var _EstablishmentAddress = _interopRequireDefault(require("../app/models/EstablishmentAddress"));

var _EstablishmentContact = _interopRequireDefault(require("../app/models/EstablishmentContact"));

var _Category = _interopRequireDefault(require("../app/models/Category"));

var _Product = _interopRequireDefault(require("../app/models/Product"));

var _Order = _interopRequireDefault(require("../app/models/Order"));

var _OrderStatus = _interopRequireDefault(require("../app/models/OrderStatus"));

var _StatusLog = _interopRequireDefault(require("../app/models/StatusLog"));

var _DiscountCoupon = _interopRequireDefault(require("../app/models/DiscountCoupon"));

var _ModelYear = _interopRequireDefault(require("../app/models/ModelYear"));

var _ChatLog = _interopRequireDefault(require("../app/models/ChatLog"));

var _DeliveryUser = _interopRequireDefault(require("../app/models/DeliveryUser"));

var _DocDeliveryUser = _interopRequireDefault(require("../app/models/DocDeliveryUser"));

var _CsvList = _interopRequireDefault(require("../app/models/CsvList"));

/** * Models ** */
// eslint-disable-next-line no-unused-vars
var models = [];

var Database = /*#__PURE__*/function () {
  function Database() {
    (0, _classCallCheck2["default"])(this, Database);
    this.init();
  }

  (0, _createClass2["default"])(Database, [{
    key: "init",
    value: function init() {
      // eslint-disable-next-line prettier/prettier
      this.connection = new _sequelize["default"](_database["default"].database, _database["default"].username, _database["default"].password, _database["default"]);

      _User["default"].init(this.connection);

      _Address["default"].init(this.connection);

      _Payment["default"].init(this.connection);

      _Establishment["default"].init(this.connection);

      _EstablishmentAddress["default"].init(this.connection);

      _EstablishmentContact["default"].init(this.connection);

      _Product["default"].init(this.connection);

      _Order["default"].init(this.connection);

      _Category["default"].init(this.connection);

      _OrderStatus["default"].init(this.connection);

      _StatusLog["default"].init(this.connection);

      _DiscountCoupon["default"].init(this.connection);

      _ModelYear["default"].init(this.connection);

      _ChatLog["default"].init(this.connection);

      _DeliveryUser["default"].init(this.connection);

      _DocDeliveryUser["default"].init(this.connection);

      _CsvList["default"].init(this.connection);

      _User["default"].associate(this.connection.models);

      _Address["default"].associate(this.connection.models);

      _Payment["default"].associate(this.connection.models);

      _Establishment["default"].associate(this.connection.models);

      _EstablishmentAddress["default"].associate(this.connection.models);

      _EstablishmentContact["default"].associate(this.connection.models);

      _Product["default"].associate(this.connection.models);

      _Order["default"].associate(this.connection.models);

      _Category["default"].associate(this.connection.models);

      _StatusLog["default"].associate(this.connection.models);

      _ModelYear["default"].associate(this.connection.models);

      _ChatLog["default"].associate(this.connection.models);

      _DeliveryUser["default"].associate(this.connection.models);

      _DocDeliveryUser["default"].associate(this.connection.models); // models
      //   .map(model => model.init(this.connection))
      //   .map(model => model.associate && model.associate(this.connection.models));

    }
  }]);
  return Database;
}();

var _default = new Database();

exports["default"] = _default;
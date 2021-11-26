"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model,
    DataTypes = _require.DataTypes;

var Address = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Address, _Model);

  var _super = _createSuper(Address);

  function Address() {
    (0, _classCallCheck2["default"])(this, Address);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Address, null, [{
    key: "init",
    value: function init(sequelize) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Address), "init", this).call(this, {
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.NUMBER,
        complement: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zip: DataTypes.STRING,
        info: DataTypes.STRING
      }, {
        sequelize: sequelize
      });
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }]);
  return Address;
}(Model);

module.exports = Address;
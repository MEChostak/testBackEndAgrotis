'use strict';

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

var Order = /*#__PURE__*/function (_Model) {
  (0, _inherits2["default"])(Order, _Model);

  var _super = _createSuper(Order);

  function Order() {
    (0, _classCallCheck2["default"])(this, Order);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Order, null, [{
    key: "init",
    value: function init(sequelize) {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Order), "init", this).call(this, {
        userId: DataTypes.INTEGER,
        productList: DataTypes.JSON,
        status: DataTypes.JSON,
        totalPrice: DataTypes.JSON,
        discountCoupon: DataTypes.STRING,
        finalPrice: DataTypes.JSON
      }, {
        sequelize: sequelize
      });
    }
  }, {
    key: "associate",
    value: function associate(models) {
      this.belongsTo(models.User, {
        foreginKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.Establishment, {
        foreginKey: 'establishmentId',
        as: 'establishment'
      });
      this.hasMany(models.StatusLog, {
        foreginKey: 'orderId',
        as: 'logs'
      });
      this.hasMany(models.ChatLog, {
        foreginKey: 'orderId',
        as: 'chatlogs'
      });
    }
  }]);
  return Order;
}(Model);

module.exports = Order;
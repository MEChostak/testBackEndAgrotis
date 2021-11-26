"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishToQueue = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _callback_api = _interopRequireDefault(require("amqplib/callback_api"));

//const CONN_URL = 'amqp://admin:DLfVeQwTzb@rabbitmq:5672';
var CONN_URL = 'amqp://localhost:5672';
var ch = null;

_callback_api["default"].connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, channel) {
    ch = channel;
  });
});

var publishToQueue = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queueName, data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ch.sendToQueue(queueName, new Buffer(data));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function publishToQueue(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.publishToQueue = publishToQueue;
process.on('exit', function (code) {
  ch.close();
  console.log("Closing rabbitmq channel");
});
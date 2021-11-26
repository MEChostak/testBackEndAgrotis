"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

require("dotenv/config");

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var Tracing = _interopRequireWildcard(require("@sentry/tracing"));

var _youch = _interopRequireDefault(require("youch"));

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _BulkStore = _interopRequireDefault(require("../src/app/services/BulkStore"));

require("express-async-errors");

var _routes2 = _interopRequireDefault(require("./routes"));

require("./database");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _ = require('lodash');

var App = /*#__PURE__*/function () {
  function App() {
    (0, _classCallCheck2["default"])(this, App);
    this.server = (0, _express["default"])();
    /*Sentry.init({
      dsn: "https://c5246b46c60a423b874e75bf97444c0e@o466860.ingest.sentry.io/5559969",
      tracesSampleRate: 0.5,
    });*/

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.service();
  }

  (0, _createClass2["default"])(App, [{
    key: "middlewares",
    value: function middlewares() {
      this.server.use(Sentry.Handlers.requestHandler());
      this.server.use((0, _expressFileupload["default"])({
        createParentPath: true
      }));
      this.server.use((0, _cors["default"])());
      this.server.use(_bodyParser["default"].json());
      this.server.use(_bodyParser["default"].urlencoded({
        extended: true
      }));
      this.server.use((0, _morgan["default"])('dev'));
      this.server.use(_express["default"]["static"](__dirname + '/public'));
    }
  }, {
    key: "service",
    value: function service() {
      setInterval(function () {
        (0, _BulkStore["default"])();
      }, 30000);
    }
  }, {
    key: "routes",
    value: function routes() {
      this.server.use(_routes2["default"]);
    }
  }, {
    key: "exceptionHandler",
    value: function exceptionHandler() {
      // this.server.use(Sentry.Handlers.errorHandler());
      this.server.use( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, req, res, next) {
          var _errors, errors;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(process.env.NODE_ENV === 'development')) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 3;
                  return new _youch["default"](err, req).toJSON();

                case 3:
                  _errors = _context.sent;
                  return _context.abrupt("return", res.status(500).json(_errors));

                case 5:
                  _context.next = 7;
                  return new _youch["default"](err, req).toJSON();

                case 7:
                  errors = _context.sent;
                  return _context.abrupt("return", res.status(500).json(errors));

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);
  return App;
}();

var _default = new App().server;
exports["default"] = _default;
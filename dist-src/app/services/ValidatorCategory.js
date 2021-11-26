"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  category: function category(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var error, details, detail;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.name || obj.name.trim().length < 1 || obj.name.trim().length > 255) {
                error++;
                detail = {
                  field: "name",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(detail);
              }

              if (!(error > 0)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", details);

            case 5:
              return _context.abrupt("return", 0);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  establishment: function establishment(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var error, details, detail, _detail;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.name || obj.name.trim().length < 2 || obj.name.trim().length > 255) {
                error++;
                detail = {
                  field: "name",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.cnpj || obj.cnpj.trim().length < 14 || obj.cnpj.trim().length > 255) {
                error++;
                _detail = {
                  field: "cnpj",
                  message: "Must a valid CNPJ"
                };
                details.push(_detail);
              }

              if (!(error > 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", details);

            case 6:
              return _context.abrupt("return", 0);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  establishmentUpdate: function establishmentUpdate(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, details, detail, _detail2;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.name || obj.name.trim().length < 2 || obj.name.trim().length > 255) {
                error++;
                detail = {
                  field: "name",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.cnpj || obj.cnpj.trim().length < 14 || obj.cnpj.trim().length > 255) {
                error++;
                _detail2 = {
                  field: "cnpj",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail2);
              }

              if (!(error > 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", details);

            case 6:
              return _context2.abrupt("return", 0);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
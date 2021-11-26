"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  address: function address(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var Helper, error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5, _detail6;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Helper = require('../services/Helper');
              error = 0;
              details = Array();

              if (!obj.street || obj.street.trim().length < 2 || obj.street.trim().length > 255) {
                error++;
                detail = {
                  field: "street",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.number || obj.number.trim().length < 1 || obj.number.trim().length > 255) {
                error++;
                _detail = {
                  field: "number",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(_detail);
              }

              if (!obj.complement || obj.complement.trim().length < 2 || obj.complement.trim().length > 255) {
                error++;
                _detail2 = {
                  field: "complement",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail2);
              }

              if (!obj.district || obj.district.trim().length < 1 || obj.district.trim().length > 255) {
                error++;
                _detail3 = {
                  field: "district",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail3);
              }

              if (!obj.city || obj.city.trim().length < 2 || obj.city.trim().length > 255) {
                error++;
                _detail4 = {
                  field: "city",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail4);
              }

              if (!obj.state || obj.state.trim().length < 2 || obj.state.trim().length > 255) {
                error++;
                _detail5 = {
                  field: "state",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail5);
              }

              if (!obj.zip || obj.zip.trim().length < 8 || obj.zip.trim().length > 9) {
                error++;
                _detail6 = {
                  field: "zip",
                  message: "Must a valid zip code."
                };
                details.push(_detail6);
              }

              if (!(error > 0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", details);

            case 12:
              return _context.abrupt("return", 0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
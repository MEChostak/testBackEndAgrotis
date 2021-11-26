"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  address: function address(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5, _detail6, _detail7, _detail8;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.title || obj.title.trim().length < 1 || obj.title.trim().length > 255) {
                error++;
                detail = {
                  field: "title",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.street || obj.street.trim().length < 2 || obj.street.trim().length > 255) {
                error++;
                _detail = {
                  field: "street",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail);
              }

              if (!obj.number || obj.number.trim().length < 1 || obj.number.trim().length > 255) {
                error++;
                _detail2 = {
                  field: "number",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(_detail2);
              }

              if (!obj.complement || obj.complement.trim().length < 2 || obj.complement.trim().length > 255) {
                error++;
                _detail3 = {
                  field: "complement",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail3);
              }

              if (!obj.district || obj.district.trim().length < 1 || obj.district.trim().length > 255) {
                error++;
                _detail4 = {
                  field: "district",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail4);
              }

              if (!obj.city || obj.city.trim().length < 2 || obj.city.trim().length > 255) {
                error++;
                _detail5 = {
                  field: "city",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail5);
              }

              if (!obj.state || obj.state.trim().length < 2 || obj.state.trim().length > 255) {
                error++;
                _detail6 = {
                  field: "state",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail6);
              }

              if (!obj.zip || obj.zip.trim().length < 8 || obj.zip.trim().length > 9) {
                error++;
                _detail7 = {
                  field: "zip",
                  message: "Must a valid zip."
                };
                details.push(_detail7);
              }

              if (!obj.info || obj.info.trim().length > 255) {
                error++;
                _detail8 = {
                  field: "info",
                  message: "Must a string with less than 255 characters."
                };
                details.push(_detail8);
              }

              if (!(error > 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", details);

            case 13:
              return _context.abrupt("return", 0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  addressUpdate: function addressUpdate(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, details, detail, _detail9, _detail10, _detail11, _detail12, _detail13, _detail14, _detail15, _detail16;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.title || obj.title.trim().length < 1 || obj.title.trim().length > 255) {
                error++;
                detail = {
                  field: "title",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.street || obj.street.trim().length < 2 || obj.street.trim().length > 255) {
                error++;
                _detail9 = {
                  field: "street",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail9);
              }

              if (!obj.number || obj.number.trim().length < 1 || obj.number.trim().length > 255) {
                error++;
                _detail10 = {
                  field: "number",
                  message: "Must a string between 1 and 255 characters."
                };
                details.push(_detail10);
              }

              if (!obj.complement || obj.complement.trim().length < 2 || obj.complement.trim().length > 255) {
                error++;
                _detail11 = {
                  field: "complement",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail11);
              }

              if (!obj.district || obj.district.trim().length < 1 || obj.district.trim().length > 255) {
                error++;
                _detail12 = {
                  field: "district",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail12);
              }

              if (!obj.city || obj.city.trim().length < 2 || obj.city.trim().length > 255) {
                error++;
                _detail13 = {
                  field: "city",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail13);
              }

              if (!obj.state || obj.state.trim().length < 2 || obj.state.trim().length > 255) {
                error++;
                _detail14 = {
                  field: "state",
                  message: "Must a string between 2 and 255 characters."
                };
                details.push(_detail14);
              }

              if (!obj.zip || obj.zip.trim().length < 8 || obj.zip.trim().length > 9) {
                error++;
                _detail15 = {
                  field: "zip",
                  message: "Must a valid zip."
                };
                details.push(_detail15);
              }

              if (!obj.info || obj.info.trim().length > 255) {
                error++;
                _detail16 = {
                  field: "info",
                  message: "Must a string with less than 255 characters."
                };
                details.push(_detail16);
              }

              if (!(error > 0)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", details);

            case 13:
              return _context2.abrupt("return", 0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
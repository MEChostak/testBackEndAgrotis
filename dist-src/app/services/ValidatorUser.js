"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  user: function user(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var Helper, error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Helper = require('../services/Helper');
              error = 0;
              details = Array();

              if (!obj.firstName || obj.firstName.trim().length < 2 || obj.firstName.trim().length > 255) {
                error++;
                detail = {
                  field: "firstName",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.lastName || obj.lastName.trim().length < 2 || obj.lastName.trim().length > 255) {
                error++;
                _detail = {
                  field: "lastName",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail);
              }

              if (!obj.birth || !Helper.isValidBirthDate(obj.birth) || !Helper.isValidDueDate(obj.birth)) {
                error++;
                _detail2 = {
                  field: "birth",
                  message: "Must be a valid date."
                };
                details.push(_detail2);
              }

              if (!obj.email || !Helper.isEmail(obj.email)) {
                error++;
                _detail3 = {
                  field: "email",
                  message: "Must be a valid e-email account."
                };
                details.push(_detail3);
              }

              if (!obj.phone || obj.phone.trim().length < 9 || obj.phone.trim().length > 20) {
                error++;
                _detail4 = {
                  field: "phone",
                  message: "Must be a valid phone number"
                };
                details.push(_detail4);
              }

              if (!obj.password || obj.password.trim().length < 8 || obj.password.trim().length > 255) {
                error++;
                _detail5 = {
                  field: "password",
                  message: "Must be a string between 8 and 255 characters."
                };
                details.push(_detail5);
              }

              if (!(error > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", details);

            case 11:
              return _context.abrupt("return", 0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  userUpdate: function userUpdate(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, details, detail, _detail6, _detail7, _detail8, _detail9, _detail10;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.firstName || obj.firstName.trim().length < 2 || obj.firstName.trim().length > 255) {
                error++;
                detail = {
                  field: "firstName",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.lastName || obj.lastName.trim().length < 2 || obj.lastName.trim().length > 255) {
                error++;
                _detail6 = {
                  field: "lastName",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail6);
              }

              if (!obj.birth || !Helper.isValidBirthDate(obj.birth) || !Helper.isValidDueDate(obj.birth)) {
                error++;
                _detail7 = {
                  field: "birth",
                  message: "Must be a valid date."
                };
                details.push(_detail7);
              }

              if (!obj.email || !Helper.isEmail(obj.email)) {
                error++;
                _detail8 = {
                  field: "email",
                  message: "Must be a valid e-email account."
                };
                details.push(_detail8);
              }

              if (!obj.phone || obj.phone.trim().length < 9 || obj.phone.trim().length > 20) {
                error++;
                _detail9 = {
                  field: "phone",
                  message: "Must be a valid phone number"
                };
                details.push(_detail9);
              }

              if (!obj.password || obj.password.trim().length < 8 || obj.password.trim().length > 255) {
                error++;
                _detail10 = {
                  field: "password",
                  message: "Must be a string between 8 and 255 characters."
                };
                details.push(_detail10);
              }

              if (!(error > 0)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", details);

            case 10:
              return _context2.abrupt("return", 0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
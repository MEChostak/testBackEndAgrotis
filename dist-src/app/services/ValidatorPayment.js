"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  payment: function payment(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var Helper, error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Helper = require('../services/Helper');
              error = 0;
              details = Array();

              if (!obj.payMethod || obj.payMethod.trim().length < 8 || obj.payMethod.trim().length > 255) {
                error++;
                detail = {
                  field: "payMethod",
                  message: "Must a string between 8 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.nameOnCard || obj.nameOnCard.trim().length < 8 || obj.nameOnCard.trim().length > 255) {
                error++;
                _detail = {
                  field: "nameOnCard",
                  message: "Name exactly like on card"
                };
                details.push(_detail);
              }

              if (!obj.expireDate || obj.expireDate.trim().length < 5 || obj.expireDate.trim().lengt > 5) {
                error++;
                _detail2 = {
                  field: "expireDate",
                  message: "Insert a valid expire date."
                };
                details.push(_detail2);
              }

              if (!obj.cardNumber || obj.cardNumber.trim().length < 16 || obj.cardNumber.trim().length > 16 || !Helper.isNumeric(obj.cardNumber)) {
                error++;
                _detail3 = {
                  field: "cardNumber",
                  message: "Insert a valid card number."
                };
                details.push(_detail3);
              }

              if (!obj.securityNumber || obj.securityNumber.trim().length < 3 || obj.securityNumber.trim().length > 3 || !Helper.isNumeric(obj.securityNumber)) {
                error++;
                _detail4 = {
                  field: "securityNumber",
                  message: "Insert a valid security number."
                };
                details.push(_detail4);
              }

              if (!obj.cpf || obj.cpf.trim().length < 11 || obj.cpf.trim().length > 11 || !Helper.isNumeric(obj.cpf)) {
                error++;
                _detail5 = {
                  field: "cpf",
                  message: "Insert a valid cpf."
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
  paymentUpdate: function paymentUpdate(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var error, details, detail, _detail6, _detail7, _detail8, _detail9, _detail10;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = 0;
              details = Array();

              if (!obj.payMethod || obj.payMethod.trim().length < 5 || obj.payMethod.trim().length > 255) {
                error++;
                detail = {
                  field: "payMethod",
                  message: "Must a string between 8 and 255 characters."
                };
                details.push(detail);
              }

              if (!obj.nameOnCard || obj.nameOnCard.trim().length < 5 || obj.nameOnCard.trim().length > 255) {
                error++;
                _detail6 = {
                  field: "nameOnCard",
                  message: "Name exactly like on card"
                };
                details.push(_detail6);
              }

              if (!obj.expireDate || obj.expireDate.trim().length < 5 || obj.expireDate.trim().lengt > 5) {
                error++;
                _detail7 = {
                  field: "expireDate",
                  message: "Insert a valid expire date."
                };
                details.push(_detail7);
              }

              if (!obj.cardNumber || obj.cardNumber.trim().length < 16 || obj.cardNumber.trim().length > 16 || !Helper.isNumeric(obj.cardNumber)) {
                error++;
                _detail8 = {
                  field: "cardNumber",
                  message: "Insert a valid card number."
                };
                details.push(_detail8);
              }

              if (!obj.securityNumber || obj.securityNumber.trim().length < 3 || obj.securityNumber.trim().length > 3 || !Helper.isNumeric(obj.securityNumber)) {
                error++;
                _detail9 = {
                  field: "securityNumber",
                  message: "Insert a valid security number."
                };
                details.push(_detail9);
              }

              if (!obj.cpf || obj.cpf.trim().length < 11 || obj.cpf.trim().length > 11 || !Helper.isNumeric(obj.cpf)) {
                error++;
                _detail10 = {
                  field: "cpf",
                  message: "Insert a valid cpf."
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
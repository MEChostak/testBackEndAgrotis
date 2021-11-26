"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  deliveryUser: function deliveryUser(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var Helper, error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5, _detail6, _detail7, _detail8, _detail9, _detail10, _detail11;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Helper = require('../services/Helper');
              error = 0;
              details = Array();

              if (!obj.fullName || obj.fullName.trim().length < 2 || obj.fullName.trim().length > 255) {
                error++;
                detail = {
                  field: 'fullName',
                  message: 'Must be a string between 2 and 255 characters.'
                };
                details.push(detail);
              }

              if (!obj.birth || !Helper.isValidBirthDate(obj.birth) || !Helper.isValidDueDate(obj.birth)) {
                error++;
                _detail = {
                  field: 'birth',
                  message: 'Must be a valid date.'
                };
                details.push(_detail);
              }

              if (!obj.email || !Helper.isEmail(obj.email)) {
                error++;
                _detail2 = {
                  field: 'email',
                  message: 'Must be a valid e-email account.'
                };
                details.push(_detail2);
              }

              if (!obj.phone || obj.phone.trim().length < 9 || obj.phone.trim().length > 20) {
                error++;
                _detail3 = {
                  field: 'phone',
                  message: 'Must be a valid phone number'
                };
                details.push(_detail3);
              }

              if (!obj.password || obj.password.trim().length < 8 || obj.password.trim().length > 255) {
                error++;
                _detail4 = {
                  field: 'password',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail4);
              }

              if (!obj.street || obj.street.trim().length < 2 || obj.street.trim().length > 255) {
                error++;
                _detail5 = {
                  field: 'street',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail5);
              }

              if (!obj.number || obj.number.trim().length < 2 || obj.number.trim().length > 255) {
                error++;
                _detail6 = {
                  field: 'number',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail6);
              }

              if (!obj.complement || obj.complement.trim().length < 2 || obj.complement.trim().length > 255) {
                error++;
                _detail7 = {
                  field: 'complement',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail7);
              }

              if (!obj.district || obj.district.trim().length < 2 || obj.district.trim().length > 255) {
                error++;
                _detail8 = {
                  field: 'district',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail8);
              }

              if (!obj.city || obj.city.trim().length < 2 || obj.city.trim().length > 255) {
                error++;
                _detail9 = {
                  field: 'city',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail9);
              }

              if (!obj.state || obj.state.trim().length < 2 || obj.state.trim().length > 255) {
                error++;
                _detail10 = {
                  field: 'state',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail10);
              }

              if (!obj.zip || obj.zip.trim().length < 2 || obj.zip.trim().length > 255) {
                error++;
                _detail11 = {
                  field: 'zip',
                  message: 'Must be a string between 8 and 255 characters.'
                };
                details.push(_detail11);
              }

              if (!(error > 0)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", details);

            case 17:
              return _context.abrupt("return", 0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
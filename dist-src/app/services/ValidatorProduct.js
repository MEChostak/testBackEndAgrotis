"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  product: function product(obj) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var Helper, error, details, detail, _detail, _detail2, _detail3, _detail4, _detail5, _detail6, _detail7, _detail8;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Helper = require('../services/Helper');
              error = 0;
              details = Array();

              if (!obj.establishmentId) {
                error++;
                detail = {
                  field: "establishmentId",
                  message: "Select the establishment ID"
                };
                details.push(detail);
              }

              if (!obj.name || obj.name.trim().length < 2 || obj.name.trim().length > 255) {
                error++;
                _detail = {
                  field: "name",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail);
              }

              if (!obj.brand || obj.brand.trim().length > 255) {
                error++;
                _detail2 = {
                  field: "brand",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail2);
              }

              if (!obj.type || obj.type.trim().length > 255) {
                error++;
                _detail3 = {
                  field: "type",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail3);
              }

              if (!obj.size || obj.size.trim().length > 255) {
                error++;
                _detail4 = {
                  field: "size",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail4);
              }

              if (!obj.color || obj.color.trim().length > 255) {
                error++;
                _detail5 = {
                  field: "color",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail5);
              }

              if (!obj.description || obj.description.trim().length > 255) {
                error++;
                _detail6 = {
                  field: "description",
                  message: "Must be a string between 2 and 255 characters."
                };
                details.push(_detail6);
              }

              if (!obj.price || obj.price.trim().length < 1 || obj.price.trim().length > 100 || !Helper.isNumeric(obj.price)) {
                error++;
                _detail7 = {
                  field: "price",
                  message: "Must be a valid price number."
                };
                details.push(_detail7);
              }

              if (!obj.quantity || obj.quantity.trim().length < 1 || obj.quantity.trim().length > 100 || !Helper.isNumeric(obj.price)) {
                error++;
                _detail8 = {
                  field: "quantity",
                  message: "Must be a valid number."
                };
                details.push(_detail8);
              }

              if (!(error > 0)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", details);

            case 14:
              return _context.abrupt("return", 0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Table = _interopRequireDefault(require("../models/Table"));

var _ValidatorTable = _interopRequireDefault(require("../services/ValidatorTable"));

var Sequelize = require('sequelize');

var jwt = require('jsonwebtoken');

var Op = Sequelize.Op;
module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, table;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                mouth: req.body.mouth,
                year: req.body.year,
                value: req.body.value
              }; // Valida o objeto

              _context.next = 3;
              return _ValidatorTable["default"].table(obj);

            case 3:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 6:
              _context.next = 8;
              return _Table["default"].findAll({
                limit: 1,
                where: {
                  mouth: obj.mouth
                }
              });

            case 8:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Mouth already registered.",
                fields: [obj.mouth]
              }));

            case 11:
              _context.next = 13;
              return _Table["default"].create(obj);

            case 13:
              table = _context.sent;

              if (table) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Table!"
              }));

            case 18:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Table created!",
                data: table
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var tableId, obj, errorDetails, table;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tableId = req.params.tableId;
              obj = {
                mouth: req.body.mouth,
                year: req.body.year,
                value: req.body.value
              }; // Valida o objeto

              _context2.next = 4;
              return _ValidatorTable["default"].table(obj);

            case 4:
              errorDetails = _context2.sent;

              if (!(errorDetails != 0)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context2.next = 9;
              return _Table["default"].findByPk(tableId);

            case 9:
              table = _context2.sent;

              if (table) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Table not found!"
              }));

            case 12:
              // Change table
              _Table["default"].update(obj, {
                where: {
                  id: tableId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Table updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to update table!"
                });
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var tableId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tableId = req.params.tableId; // Pesquisar a tabela

              _Table["default"].findByPk(tableId).then(function (table) {
                console.log(table);

                if (!table) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Table not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: table
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find table!"
                });
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var page, obj, Op, whereClause;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              page = req.params.page;
              obj = {
                mouth: req.body.mouth,
                year: req.body.year,
                value: req.body.value
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.mouth) {
                whereClause.mouth = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.mouth + '%');
              }

              if (obj.year) {
                whereClause.year = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.year + '%');
              }

              if (obj.value) {
                whereClause.value = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.value + '%');
              }

              console.log(obj);
              console.log("console log aqui", process.env.PER_PAGE);

              _Table["default"].findAndCountAll({
                where: whereClause,
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (table) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: table.count,
                    totalPages: Math.ceil(table.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: table.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list table!"
                });
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var tableId, table;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              tableId = req.params.tableId; // Verifica se a table existe

              _context5.next = 3;
              return _Table["default"].findByPk(tableId);

            case 3:
              table = _context5.sent;

              if (table) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Table not found!"
              }));

            case 6:
              // Del a table
              _Table["default"].destroy({
                where: {
                  id: tableId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Table deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to delete table!"
                });
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
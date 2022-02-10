"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _CustomersReading = _interopRequireDefault(require("../models/CustomersReading"));

// import ValidatorUser from '../services/ValidatorUser';
var Sequelize = require('sequelize');

var jwt = require('jsonwebtoken');

var fs = require("fs");

var path = require('path');

var Op = Sequelize.Op;
module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, register, customer;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                nit: req.body.nit,
                cpf: req.body.cpf,
                birth: req.body.birth,
                mother: req.body.mother,
                extract: req.body.extract,
                contribList: []
              }; // Valida o objeto
              // const errorDetails = await ValidatorUser.user(obj);
              // if (errorDetails != 0) {
              //     return res.status(400).json({
              //         timestamp: Date.now(),
              //         error: "Malformed object.",
              //         fields: errorDetails
              //     });
              // }
              // Verifica se o user já está existe

              _context.next = 3;
              return _CustomersReading["default"].findAll({
                limit: 1,
                where: {
                  name: obj.name
                }
              });

            case 3:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Customer already registered.",
                fields: [obj.name]
              }));

            case 6:
              _context.next = 8;
              return _CustomersReading["default"].create(obj);

            case 8:
              customer = _context.sent;

              if (customer) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Customer!"
              }));

            case 13:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Customer created!",
                data: customer
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var customerId, obj, customer;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              customerId = req.params.customerId;
              obj = {
                name: req.body.name,
                nit: req.body.nit,
                cpf: req.body.cpf,
                birth: req.body.birth,
                mother: req.body.mother,
                extract: req.body.extract,
                contribList: []
              }; // Valida o objeto
              // const errorDetails = await ValidatorUser.userUpdate(obj);
              // if (errorDetails != 0) {
              //     return res.status(400).json({
              //         timestamp: Date.now(),
              //         error: "Malformed object.",
              //         fields: errorDetails
              //     });
              // }
              // Verifica se o user existe

              _context2.next = 4;
              return _CustomersReading["default"].findByPk(customerId);

            case 4:
              customer = _context2.sent;

              if (customer) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Customer not found!"
              }));

            case 7:
              // Altera o user
              _CustomersReading["default"].update(obj, {
                where: {
                  id: customerId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Customer updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to update customer!"
                });
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var customerId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              customerId = req.params.customerId; // Pesquisa

              _CustomersReading["default"].findByPk(customerId).then(function (customer) {
                console.log(customer);

                if (!customer) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Customer not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: customer
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find customer!"
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
                name: req.body.name,
                nit: req.body.nit,
                cpf: req.body.cpf,
                birth: req.body.birth,
                mother: req.body.mother,
                extract: req.body.extract,
                contribList: []
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              if (obj.nit) {
                whereClause.nit = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.nit + '%');
              }

              if (obj.cpf) {
                whereClause.cpf = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.cpf + '%');
              }

              if (obj.birth) {
                whereClause.birth = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.birth + '%');
              }

              console.log(obj);
              console.log("console log aqui", process.env.PER_PAGE);

              _CustomersReading["default"].findAndCountAll({
                where: whereClause,

                /* include: [
                    { association: 'profile' },
                    { association: 'organization' },
                ], */
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (customer) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: customer.count,
                    totalPages: Math.ceil(customer.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: customer.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list customer!"
                });
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var customerId, customer;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              customerId = req.params.customerId; // Verifica se o customer existe

              _context5.next = 3;
              return _CustomersReading["default"].findByPk(customerId);

            case 3:
              customer = _context5.sent;

              if (customer) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Customer not found!"
              }));

            case 6:
              // Deleta o user
              _CustomersReading["default"].destroy({
                where: {
                  id: customerId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Customer deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to delete customer!"
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Person = _interopRequireDefault(require("../models/Person"));

var _ValidatorPerson = _interopRequireDefault(require("../services/ValidatorPerson"));

// import Organization from '../models/Organization';
var Sequelize = require('sequelize');

var jwt = require('jsonwebtoken');

var Op = Sequelize.Op;
module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                description: req.body.description,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                mail: req.body.mail
              }; // Valida o objeto

              _context.next = 3;
              return _ValidatorPerson["default"].person(obj);

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
              return _Person["default"].findAll({
                limit: 1,
                where: {
                  name: obj.name
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
                error: "User already registered.",
                fields: [obj.name]
              }));

            case 11:
              _context.next = 13;
              return _Person["default"].create(obj);

            case 13:
              person = _context.sent;

              if (person) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Person!"
              }));

            case 18:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Person created!",
                data: person
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
      var personId, obj, errorDetails, person;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              personId = req.params.personId;
              obj = {
                name: req.body.name,
                description: req.body.description,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                mail: req.body.mail
              }; // Valida o objeto

              _context2.next = 4;
              return _ValidatorPerson["default"].person(obj);

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
              return _Person["default"].findByPk(personId);

            case 9:
              person = _context2.sent;

              if (person) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Person not found!"
              }));

            case 12:
              // Altera o person
              _Person["default"].update(obj, {
                where: {
                  id: personId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Person updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to update person!"
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
      var personId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              personId = req.params.personId; // Pesquisar person

              _Person["default"].findByPk(personId).then(function (person) {
                console.log(person);

                if (!person) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Person not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: person
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find person!"
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
                description: req.body.description,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                mail: req.body.mail
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              console.log(obj);
              console.log("console log aqui", process.env.PER_PAGE);

              _Person["default"].findAndCountAll({
                where: whereClause,
                // include: [
                //     { association: 'profile' },
                //     { association: 'organization' },
                // ],
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (person) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: person.count,
                    totalPages: Math.ceil(person.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: person.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list person!"
                });
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var personId, person;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              personId = req.params.personId; // Verifica se o person existe

              _context5.next = 3;
              return _Person["default"].findByPk(personId);

            case 3:
              person = _context5.sent;

              if (person) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Person not found!"
              }));

            case 6:
              // Deleta o person
              _Person["default"].destroy({
                where: {
                  id: personId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Person deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to delete person!"
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Organization = _interopRequireDefault(require("../models/Organization"));

var _ValidatorOrganization = _interopRequireDefault(require("../services/ValidatorOrganization"));

var Sequelize = require('sequelize'); // const Op = Sequelize.Op;


module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, organization;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                description: req.body.description,
                paymentStatus: req.body.paymentStatus,
                userTest: req.body.userTest,
                planId: req.body.planId
              }; // Valida o objeto

              _context.next = 3;
              return _ValidatorOrganization["default"].Organization(obj);

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
              return _Organization["default"].findAll({
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
              return _Organization["default"].create(obj);

            case 13:
              organization = _context.sent;

              if (organization) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Organization!"
              }));

            case 18:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Organization created!",
                data: organization
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
      var organizationId, obj, errorDetails, organization;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              organizationId = req.params.organizationId;
              obj = {
                name: req.body.name,
                description: req.body.description,
                paymentStatus: req.body.paymentStatus,
                userTest: req.body.userTest,
                planId: req.body.planId
              }; // Valida o objeto

              _context2.next = 4;
              return _ValidatorOrganization["default"].Organization(obj);

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
              return _Organization["default"].findByPk(organizationId);

            case 9:
              organization = _context2.sent;

              if (organization) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
              }));

            case 12:
              // Altera a oraganization
              _Organization["default"].update(obj, {
                where: {
                  id: organizationId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Organization updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to update organization!"
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
      var organizationId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              organizationId = req.params.organizationId; // Pesquisar o usuário

              _Organization["default"].findByPk(organizationId // inclui na pesquisa todos os itens relacionados
              ).then(function (organization) {
                console.log(organization);

                if (!organization) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Organization not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: organization
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find organization!"
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
                paymentStatus: req.body.paymentStatus,
                userTest: req.body.userTest,
                planId: req.body.planId,
                country: req.body.country,
                city: req.body.city,
                state: req.body.state
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              if (obj.description) {
                whereClause.description = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.description + '%');
              }

              if (obj.paymentStatus) {
                whereClause.paymentStatus = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.paymentStatus + '%');
              }

              if (obj.userTest) {
                whereClause.userTest = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.userTest + '%');
              }

              if (obj.country) {
                whereClause.country = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.country + '%');
              }

              if (obj.city) {
                whereClause.city = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.city + '%');
              }

              if (obj.state) {
                whereClause.state = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.state + '%');
              }

              console.log(obj);
              console.log("console log aqui", process.env.PER_PAGE);

              _Organization["default"].findAndCountAll({
                where: whereClause,
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (organization) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: organization.count,
                    totalPages: Math.ceil(organization.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: organization.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list organization!"
                });
              });

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var organizationId, organization;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              organizationId = req.params.organizationId; // Verifica se o user existe

              _context5.next = 3;
              return _Organization["default"].findByPk(organizationId);

            case 3:
              organization = _context5.sent;

              if (organization) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Organization not found!"
              }));

            case 6:
              // Deleta a org
              _Organization["default"].destroy({
                where: {
                  id: organizationId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Organization deleted!"
                });
              })["catch"](function (err) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to delete Organization!"
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _DeliveryUser = _interopRequireDefault(require("../models/DeliveryUser"));

var _DeliveryUserValidator = _interopRequireDefault(require("../services/DeliveryUserValidator"));

/* eslint-disable no-console */
var Sequelize = require('sequelize');

var Op = Sequelize.Op;
module.exports = {
  // Criar novo Usuário
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                profile: '',
                establishmentId: 0,
                fullName: req.body.fullName,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
              }; // Perfil

              if (req.body.profile) {
                obj.profile = req.body.profile;
              } // Estabelecimento


              if (req.body.establishmentId) {
                obj.establishmentId = req.body.establishmentId;
              }

              _context.next = 5;
              return _DeliveryUserValidator["default"].deliveryUser(obj);

            case 5:
              errorDetails = _context.sent;

              if (!(errorDetails !== 0)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 8:
              _context.next = 10;
              return _DeliveryUser["default"].findAll({
                limit: 1,
                where: {
                  email: obj.email
                }
              });

            case 10:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'User already registered.',
                fields: obj.email
              }));

            case 13:
              _context.next = 15;
              return _DeliveryUser["default"].create(obj);

            case 15:
              user = _context.sent;

              if (user) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create User!'
              }));

            case 18:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'User created!',
                user: obj
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Listagem de usuários
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page, obj, whereClause;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              obj = {
                profile: req.body.profile,
                establishmentId: req.body.establishmentId,
                name: req.body.firstName,
                status: req.body.status,
                email: req.body.email,
                country: req.body.country,
                city: req.body.city,
                state: req.body.state
              }; // eslint-disable-next-line no-new-object

              whereClause = new Object();

              if (obj.profile) {
                whereClause.profile = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.profile, "%"));
              }

              if (obj.establishmentId) {
                whereClause.establishmentId = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.establishmentId, "%"));
              }

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.name, "%"));
              }

              if (obj.status) {
                whereClause.status = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.status, "%"));
              }

              if (obj.email) {
                whereClause.email = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.email, "%"));
              }

              if (obj.country) {
                whereClause.country = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.country, "%"));
              }

              if (obj.city) {
                whereClause.city = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.city, "%"));
              }

              if (obj.state) {
                whereClause.state = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.state, "%"));
              }

              _DeliveryUser["default"].findAndCountAll({
                where: whereClause,
                // eslint-disable-next-line radix
                limit: parseInt(process.env.PER_PAGE),
                // eslint-disable-next-line radix
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (user) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: user.count,
                    // eslint-disable-next-line radix
                    totalPages: Math.ceil(user.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  users: user.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list user!'
                });
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // Dados do usuário definido pelo ID
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var deliveryUserId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              deliveryUserId = req.params.deliveryUserId; // Pesquisar o Aircraft

              _DeliveryUser["default"].findByPk(deliveryUserId).then(function (deliveryUser) {
                console.log(deliveryUser);

                if (!deliveryUser) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'DeliveryUser not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: '',
                  data: deliveryUser
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find DeliveryUser!'
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
  // Atualizar Informações do Usuário
  // eslint-disable-next-line consistent-return
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var deliveryUserId, obj, errorDetails, deliveryUser;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              deliveryUserId = req.params.deliveryUserId;
              obj = {
                fullName: req.body.fullName,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
              };
              _context4.next = 4;
              return _DeliveryUserValidator["default"].deliveryUser(obj);

            case 4:
              errorDetails = _context4.sent;

              if (!(errorDetails !== 0)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 7:
              _context4.next = 9;
              return _DeliveryUser["default"].findByPk(deliveryUserId);

            case 9:
              deliveryUser = _context4.sent;

              if (deliveryUser) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'DeliveryUser not found!'
              }));

            case 12:
              // Altera o DeliveryUser
              _DeliveryUser["default"].update(obj, {
                where: {
                  id: deliveryUserId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Updated DeliveryUser!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to update DeliveryUser!'
                });
              });

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Deletar Usuário
  // eslint-disable-next-line consistent-return
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var deliveryUserId, user;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deliveryUserId = req.params.deliveryUserId;
              _context5.next = 3;
              return _DeliveryUser["default"].findByPk(deliveryUserId);

            case 3:
              user = _context5.sent;

              if (user) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'User not found!'
              }));

            case 6:
              _DeliveryUser["default"].destroy({
                where: {
                  id: deliveryUserId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'User deleted!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to delete user!'
                });
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  storeImages: function storeImages(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  } // to do

};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Address = _interopRequireDefault(require("../models/Address"));

var _Payment = _interopRequireDefault(require("../models/Payment"));

var _ValidatorUser = _interopRequireDefault(require("../services/ValidatorUser"));

var _ValidatorAddress = _interopRequireDefault(require("../services/ValidatorAddress"));

var _ValidatorPayment = _interopRequireDefault(require("../services/ValidatorPayment"));

var jwt = require('jsonwebtoken');

var Sequelize = require('sequelize');

var Op = Sequelize.Op;
module.exports = {
  //Criar novo Usuário
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                profile: req.body.profile,
                establishmentId: req.body.establishmentId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                status: req.body.status,
                password: req.body.password,
                addresses: {},
                payments: []
              }; // Endereço

              if (req.body.addresses) {
                obj.addresses = req.body.addresses;
              } // Meio de pagamento


              if (req.body.payments) {
                obj.payments.push(req.body.payments);
              } //Perfil


              if (req.body.profile) {
                obj.profile = req.body.profile;
              } //Estabelecimento


              if (req.body.establishmentId) {
                obj.establishmentId = req.body.establishmentId;
              }

              _context.next = 7;
              return _ValidatorUser["default"].user(obj);

            case 7:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 10:
              _context.next = 12;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  email: obj.email
                }
              });

            case 12:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User already registered.",
                fields: obj.email
              }));

            case 15:
              _context.next = 17;
              return _User["default"].create(obj, {
                include: [{
                  association: 'addresses'
                }, {
                  association: 'payments'
                }]
              });

            case 17:
              user = _context.sent;

              if (user) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create User!"
              }));

            case 22:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "User created!",
                user: obj
              }));

            case 23:
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
                password: req.body.password
              };
              whereClause = new Object();

              if (obj.profile) {
                whereClause.profile = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.profile + '%');
              }

              if (obj.establishmentId) {
                whereClause.establishmentId = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.establishmentId + '%');
              }

              if (obj.name) {
                whereClause.firstName = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              if (obj.status) {
                whereClause.status = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.status + '%');
              }

              if (obj.email) {
                whereClause.email = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.email + '%');
              }

              if (obj.password) {
                whereClause.password = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.password + '%');
              }

              _User["default"].findAndCountAll({
                where: whereClause,
                include: [{
                  association: 'addresses'
                }, {
                  association: 'payments'
                } // {association: 'profile'},
                // {association: 'establishment'}
                ],
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (user) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: user.count,
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
                  message: "Failed to list user!"
                });
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  login: function login(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var obj;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              obj = {
                email: req.body.email,
                password: req.body.password
              };

              _User["default"].findOne({
                where: obj
              }).then(function (user) {
                console.log(user);

                if (!user) {
                  return res.status(200).send({
                    ok: false,
                    message: 'Usuário não cadastrado com o login informado'
                  });
                }

                var _user = {
                  id: user.id,
                  profile: user.profile,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  status: user.status,
                  establishmentId: user.establishmentId
                };
                var token = jwt.sign(_user, process.env.SECRETTOKEN, {
                  expiresIn: eval(process.env.TIMEOUT)
                });
                return res.status(200).send({
                  ok: true,
                  message: 'Usuário autenticado com sucesso',
                  token: token,
                  id: user.id,
                  name: user.firstName,
                  profile: user.profile
                });
              })["catch"](function (err) {
                console.log(err.message);
                return res.status(400).send({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find user"
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
  appLogin: function appLogin(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var obj;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              obj = {
                phone: req.body.phone,
                password: req.body.password
              };

              _User["default"].findOne({
                where: obj
              }).then(function (user) {
                console.log(user);

                if (!user) {
                  return res.status(400).send({
                    ok: false,
                    message: 'Usuário não cadastrado com o login informado'
                  });
                } // var _user = {
                // 	id: user.id,
                // 	profile: user.profile,
                // 	firstName: user.firstName,
                // 	lastName: user.lastName,
                // 	email: user.email,
                // 	status: user.status,
                // 	establishmentId: user.establishmentId,
                // };
                // var token = jwt.sign(_user, process.env.SECRETTOKEN, {
                // 	expiresIn: eval(process.env.TIMEOUT)
                // });


                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Usuário autenticado com sucesso',
                  user: user
                });
              })["catch"](function (err) {
                console.log(err.message);
                return res.status(400).send({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find user"
                });
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Dados do usuário definido pelo ID
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var userId;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = req.params.userId;

              _User["default"].findByPk(userId, {
                include: [{
                  association: 'addresses'
                }, {
                  association: 'payments'
                }]
              }).then(function (user) {
                // console.log(user);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  user: user
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find user"
                });
              });

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // Atualizar Informações do Usuário
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var userId, obj, errorDetails, user;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = req.params.userId;
              obj = {
                profile: req.body.profile,
                establishmentId: req.body.establishmentId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birth: req.body.birth,
                email: req.body.email,
                phone: req.body.phone,
                status: req.body.status,
                password: req.body.password
              };
              _context6.next = 4;
              return _ValidatorUser["default"].userUpdate(obj);

            case 4:
              errorDetails = _context6.sent;

              if (!(errorDetails != 0)) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context6.next = 9;
              return _User["default"].findByPk(userId);

            case 9:
              user = _context6.sent;

              if (user) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
              }));

            case 12:
              _context6.next = 14;
              return _User["default"].update(obj, {
                where: {
                  id: userId
                }
              });

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  // Deletar Usuário
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var userId, user;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = req.params.userId;
              _context7.next = 3;
              return _User["default"].findByPk(userId);

            case 3:
              user = _context7.sent;

              if (user) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "User not found!"
              }));

            case 6:
              _User["default"].destroy({
                where: {
                  id: userId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "User deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete user!"
                });
              });

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  // Adicionar endereço
  addressStore: function addressStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var obj, errorDetails, register, address;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              obj = {
                userId: {},
                title: req.body.title,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                info: req.body.info
              }; // Id do usuário

              if (req.body.userId) {
                obj.userId = req.body.userId;
              }

              _context8.next = 4;
              return _ValidatorAddress["default"].address(obj);

            case 4:
              errorDetails = _context8.sent;

              if (!(errorDetails != 0)) {
                _context8.next = 7;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context8.next = 9;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  id: obj.userId
                }
              });

            case 9:
              register = _context8.sent;

              if (!(register.length == 0)) {
                _context8.next = 12;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User doesn't exist",
                fields: [obj.userId]
              }));

            case 12:
              _context8.next = 14;
              return _Address["default"].create(obj);

            case 14:
              address = _context8.sent;

              if (address) {
                _context8.next = 19;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create address!"
              }));

            case 19:
              return _context8.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Address created!",
                address: obj
              }));

            case 20:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  // Deletar endereço
  addressDelete: function addressDelete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var addressId, address;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              addressId = req.params.addressId;
              _context9.next = 3;
              return _Address["default"].findByPk(addressId);

            case 3:
              address = _context9.sent;

              if (address) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Adress not found!"
              }));

            case 8:
              _Address["default"].destroy({
                where: {
                  id: addressId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Address deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete address!"
                });
              });

            case 9:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  // Adicionar meio de pagamento
  paymentStore: function paymentStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var obj, errorDetails, register, payment;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              obj = {
                userId: {},
                payMethod: req.body.payMethod,
                nameOnCard: req.body.nameOnCard,
                expireDate: req.body.expireDate,
                cardNumber: req.body.cardNumber,
                securityNumber: req.body.securityNumber,
                cpf: req.body.cpf
              }; // Id do usuário

              if (req.body.userId) {
                obj.userId = req.body.userId;
              }

              _context10.next = 4;
              return _ValidatorPayment["default"].payment(obj);

            case 4:
              errorDetails = _context10.sent;

              if (!(errorDetails != 0)) {
                _context10.next = 7;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context10.next = 9;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  id: obj.userId
                }
              });

            case 9:
              register = _context10.sent;

              if (!(register.length == 0)) {
                _context10.next = 12;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User doesn't exist",
                fields: [obj.userId]
              }));

            case 12:
              _context10.next = 14;
              return _Payment["default"].create(obj);

            case 14:
              payment = _context10.sent;

              if (payment) {
                _context10.next = 19;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to create payment method"
              }));

            case 19:
              return _context10.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Payment method created!",
                payment: obj
              }));

            case 20:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  // Deletar meio de pagamento
  paymentDelete: function paymentDelete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var paymentId, payment;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              paymentId = req.params.paymentId;
              _context11.next = 3;
              return _Payment["default"].findByPk(paymentId);

            case 3:
              payment = _context11.sent;

              if (payment) {
                _context11.next = 8;
                break;
              }

              return _context11.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Payment not found!"
              }));

            case 8:
              _Payment["default"].destroy({
                where: {
                  id: paymentId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Payment method deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete payment!"
                });
              });

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  }
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Payment = _interopRequireDefault(require("../models/Payment"));

var _User = _interopRequireDefault(require("../models/User"));

var _ValidatorPayment = _interopRequireDefault(require("../services/ValidatorPayment"));

module.exports = {
  // Cria o método de pagamento
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, register, errorDetails, payment;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                userId: req.body.userId,
                payMethod: req.body.payMethod,
                nameOnCard: req.body.nameOnCard,
                expireDate: req.body.expireDate,
                cardNumber: req.body.cardNumber,
                securityNumber: req.body.securityNumber,
                cpf: req.body.cpf
              }; // Verifica se o User existe

              _context.next = 3;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  id: obj.userId
                }
              });

            case 3:
              register = _context.sent;

              if (!(register.length == 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User doesn't exist",
                fields: [obj.userId]
              }));

            case 6:
              _context.next = 8;
              return _ValidatorPayment["default"].payment(obj);

            case 8:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 11:
              _context.next = 13;
              return _Payment["default"].create(obj, {
                include: [{
                  association: 'user'
                }]
              });

            case 13:
              payment = _context.sent;

              if (payment) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Failed to create payment method'
              }));

            case 16:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Payment method created!',
                payment: obj
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os métodos de pagamento
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _Payment["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (payment) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: payment.count,
                    totalPages: Math.ceil(payment.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  payment: payment.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list payment methods'
                });
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // Mostra o método de pagamento selecionado e o usuário ao qual pertence
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var paymentId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              paymentId = req.params.paymentId;
              _context3.next = 3;
              return _Payment["default"].findByPk(paymentId, {
                include: [{
                  association: 'user'
                }]
              }).then(function (payment) {
                console.log(payment);

                if (!payment) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Payment method not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  payment: payment
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find payment method'
                });
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  // Atualiza o método de pagamento selecionado
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var paymentId, payment, obj, errorDetails;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              paymentId = req.params.paymentId;
              _context4.next = 3;
              return _Payment["default"].findByPk(paymentId);

            case 3:
              payment = _context4.sent;

              if (payment) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Payment method not found!'
              }));

            case 6:
              obj = {
                userId: req.body.userId,
                payMethod: req.body.payMethod,
                nameOnCard: req.body.nameOnCard,
                expireDate: req.body.expireDate,
                cardNumber: req.body.cardNumber,
                securityNumber: req.body.securityNumber,
                cpf: req.body.cpf
              };
              _context4.next = 9;
              return _ValidatorPayment["default"].paymentUpdate(obj);

            case 9:
              errorDetails = _context4.sent;

              if (!(errorDetails != 0)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 12:
              _Payment["default"].update(obj, {
                where: {
                  id: paymentId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!payment) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update payment method!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Payment method updated!',
                  payment: obj
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
  // Deleta o método de pagamento selecionado
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var paymentId, payment;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              paymentId = req.params.paymentId;
              _context5.next = 3;
              return _Payment["default"].findByPk(paymentId);

            case 3:
              payment = _context5.sent;

              if (payment) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Adress not found!'
              }));

            case 6:
              _Payment["default"].destroy({
                where: {
                  id: paymentId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!payment) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete payment!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Payment method deleted!'
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
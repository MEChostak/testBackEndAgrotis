"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Address = _interopRequireDefault(require("../models/Address"));

var _User = _interopRequireDefault(require("../models/User"));

var _ValidatorAddress = _interopRequireDefault(require("../services/ValidatorAddress"));

var Sequelize = require('sequelize');

module.exports = {
  // Criar novo endereço
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, register, errorDetails, address;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                userId: req.body.userId,
                title: req.body.title,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                info: req.body.info
              }; // Verifica se o usuário existe

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
              return _ValidatorAddress["default"].address(obj);

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
              return _Address["default"].create(obj, {
                include: [{
                  association: 'user'
                }]
              });

            case 13:
              address = _context.sent;

              if (address) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create address!'
              }));

            case 16:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Address created!',
                address: obj
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista todos os endereços
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _Address["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (address) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: address.count,
                    totalPages: Math.ceil(address.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  adresses: address.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list address'
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
  // Mostra o endereço selecionado e mostra a qual usuário pertence
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var addressId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              addressId = req.params.addressId;
              _context3.next = 3;
              return _Address["default"].findByPk(addressId, {
                include: [{
                  association: 'user'
                }]
              }).then(function (address) {
                console.log(address);

                if (!address) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Adress not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  address: address
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find address'
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
  // Atualiza o endereço
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var addressId, address, obj, errorDetails;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              addressId = req.params.addressId;
              _context4.next = 3;
              return _Address["default"].findByPk(addressId);

            case 3:
              address = _context4.sent;

              if (address) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Adress not found!'
              }));

            case 6:
              obj = {
                title: req.body.title,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                info: req.body.info
              };
              _context4.next = 9;
              return _ValidatorAddress["default"].addressUpdate(obj);

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
              _Address["default"].update(obj, {
                where: {
                  id: addressId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!address) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update address!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Adress updated!',
                  address: obj
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
  // Deleta o endereço
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var addressId, address;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              addressId = req.params.addressId;
              _context5.next = 3;
              return _Address["default"].findByPk(addressId);

            case 3:
              address = _context5.sent;

              if (address) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Adress not found!'
              }));

            case 6:
              _Address["default"].destroy({
                where: {
                  id: addressId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!address) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete address!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Address deleted!'
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
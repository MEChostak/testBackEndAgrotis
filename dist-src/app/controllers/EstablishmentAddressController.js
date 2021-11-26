"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _EstablishmentAddress = _interopRequireDefault(require("../models/EstablishmentAddress"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

var _ValidatorEstablishmentAddress = _interopRequireDefault(require("../services/ValidatorEstablishmentAddress"));

/* eslint-disable radix */
module.exports = {
  // Cria o endereço do estabelecimento
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, establishment, establishmentAddressId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
              };
              _context.next = 3;
              return _ValidatorEstablishmentAddress["default"].address(obj);

            case 3:
              errorDetails = _context.sent;

              if (!(errorDetails !== 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 6:
              _context.next = 8;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 8:
              establishment = _context.sent;

              if (!(establishment.length == 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Establishment doesn't exist",
                fields: [obj.establishmentId]
              }));

            case 11:
              _context.next = 13;
              return _EstablishmentAddress["default"].create(obj, {
                include: [{
                  association: 'establishment'
                }]
              });

            case 13:
              establishmentAddressId = _context.sent;

              if (establishmentAddressId) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create Establishment address!'
              }));

            case 16:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Establishment address created!',
                establishmentAddress: obj
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os endereços de estabelecimentos cadastrados
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _EstablishmentAddress["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (establishmentAddress) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: establishmentAddress.count,
                    totalPages: Math.ceil(establishmentAddress.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  addresses: establishmentAddress.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list establishment address!'
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
  // Mostra o endereço selecionado e o estabelecimento ao qual pertence
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var establishmentAddressId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              establishmentAddressId = req.params.establishmentAddressId;
              _context3.next = 3;
              return _EstablishmentAddress["default"].findByPk(establishmentAddressId, {
                include: [{
                  association: 'establishment'
                }]
              }).then(function (establishmentAddress) {
                console.log(establishmentAddress);

                if (!establishmentAddress) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Establishment address not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  establishmentAddress: establishmentAddress
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find establishment address'
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
  // Atualiza o endereço selecionado
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var establishmentAddressId, establishmentAddress, obj;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              establishmentAddressId = req.params.establishmentAddressId;
              _context4.next = 3;
              return _EstablishmentAddress["default"].findByPk(establishmentAddressId);

            case 3:
              establishmentAddress = _context4.sent;

              if (establishmentAddress) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Establishment address not found!'
              }));

            case 6:
              obj = {
                establishmentId: req.body.establishmentId,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
              };

              _EstablishmentAddress["default"].update(obj, {
                where: {
                  id: establishmentAddressId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!establishmentAddressId) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update establishment address!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Establishment address updated!'
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
  // Deleta o endereço selecionado
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var establishmentAddressId, establishmentAddress;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              establishmentAddressId = req.params.establishmentAddressId;
              _context5.next = 3;
              return _EstablishmentAddress["default"].findByPk(establishmentAddressId, {
                include: [{
                  association: 'establishment'
                }]
              });

            case 3:
              establishmentAddress = _context5.sent;

              if (establishmentAddress) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Establishment address not found!'
              }));

            case 6:
              _context5.next = 8;
              return _EstablishmentAddress["default"].destroy({
                where: {
                  id: establishmentAddressId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!establishmentAddress) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete establishment address!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Establishment address deleted!'
                });
              });

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
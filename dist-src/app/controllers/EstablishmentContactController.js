"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _EstablishmentContact = _interopRequireDefault(require("../models/EstablishmentContact"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

module.exports = {
  // Cria o contato do estabelecimento
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, establishment, establishmentContact;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                phone: req.body.phone,
                email: req.body.email
              }; // Verifica se o estabelecimento existe

              _context.next = 3;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 3:
              establishment = _context.sent;

              if (!(establishment.length == 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Establishment doesn't exist",
                fields: [obj.establishmentId]
              }));

            case 6:
              _context.next = 8;
              return _EstablishmentContact["default"].create(obj, {
                include: [{
                  association: 'establishment'
                }]
              });

            case 8:
              establishmentContact = _context.sent;

              if (establishmentContact) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create Establishment contact!'
              }));

            case 11:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Establishment contact created!',
                establishmentContact: obj
              }));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os contatos dos estabelecimentos
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _EstablishmentContact["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['establishmentId']]
              }).then(function (establishmentContact) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: establishmentContact.count,
                    totalPages: Math.ceil(establishmentContact.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  contacts: establishmentContact.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list establishment contact!'
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
  // Mostra os contatos do estabelecimento selecionado
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var establishmentContactId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              establishmentContactId = req.params.establishmentContactId;
              _context3.next = 3;
              return _EstablishmentContact["default"].findByPk(establishmentContactId, {
                include: [{
                  association: 'establishment'
                }]
              }).then(function (establishmentContact) {
                console.log(establishmentContact);

                if (!establishmentContact) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Establishment contact not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  establishmentContact: establishmentContact
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find establishment contact'
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
  // Atualiza o contato selecionado
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var establishmentContactId, establishmentContact, obj;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              establishmentContactId = req.params.establishmentContactId;
              _context4.next = 3;
              return _EstablishmentContact["default"].findByPk(establishmentContactId);

            case 3:
              establishmentContact = _context4.sent;

              if (establishmentContact) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Establishment contact not found!'
              }));

            case 6:
              obj = {
                establishmentId: req.body.establishmentId,
                phone: req.body.phone,
                email: req.body.email
              };

              _EstablishmentContact["default"].update(obj, {
                where: {
                  id: establishmentContactId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!establishmentContactId) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update establishment contact!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Establishment contact updated!'
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
  // Deleta o contato
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var establishmentContactId, establishmentContact;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              establishmentContactId = req.params.establishmentContactId;
              _context5.next = 3;
              return _EstablishmentContact["default"].findByPk(establishmentContactId, {
                include: [{
                  association: 'establishment'
                }]
              });

            case 3:
              establishmentContact = _context5.sent;

              if (establishmentContact) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Establishment contact not found!'
              }));

            case 6:
              _context5.next = 8;
              return _EstablishmentContact["default"].destroy({
                where: {
                  id: establishmentContactId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!establishmentContact) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete establishment contact!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Establishment contact deleted!'
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
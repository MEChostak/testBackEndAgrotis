"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

var _EstablishmentAddress = _interopRequireDefault(require("../models/EstablishmentAddress"));

var _EstablishmentContact = _interopRequireDefault(require("../models/EstablishmentContact"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _ValidatorEstablishment = _interopRequireDefault(require("../services/ValidatorEstablishment"));

var _ValidatorEstablishmentAddress = _interopRequireDefault(require("../services/ValidatorEstablishmentAddress"));

var _ValidatorCategory = _interopRequireDefault(require("../services/ValidatorCategory"));

var Sequelize = require('sequelize');

var Op = Sequelize.Op;
module.exports = {
  // Cadastra um novo estabelecimento
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, establishment;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                cnpj: req.body.cnpj,
                planId: req.body.planId,
                paymentStatus: req.body.paymentStatus,
                address: {},
                contacts: {}
              }; // Endereço

              if (req.body.address) {
                obj.address = req.body.address;
              } // Contato


              if (req.body.contacts) {
                obj.contacts = req.body.contacts;
              } // Categorias


              if (req.body.categories) {
                obj.categories = req.body.categories;
              }

              _context.next = 6;
              return _ValidatorEstablishment["default"].establishment(obj);

            case 6:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 9:
              _context.next = 11;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  cnpj: obj.cnpj
                }
              });

            case 11:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "User already registered.",
                fields: [obj.cnpj]
              }));

            case 14:
              ;
              _context.next = 17;
              return _Establishment["default"].create(obj, {
                include: [{
                  association: 'address'
                }, {
                  association: 'contacts'
                }]
              });

            case 17:
              establishment = _context.sent;

              if (establishment) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Establishment!"
              }));

            case 22:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Establishment created!",
                establishment: obj
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os estabelecimentos
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page, obj, whereClause, whereAddress;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              obj = {
                state: req.body.state,
                city: req.body.city,
                paymentStatus: req.body.paymentStatus,
                name: req.body.name
              };
              whereClause = new Object();
              whereAddress = new Object();

              if (obj.state) {
                whereAddress.state = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.state + '%');
              }

              if (obj.city) {
                whereAddress.city = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.city + '%');
              }

              if (obj.paymentStatus) {
                whereClause.paymentStatus = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.paymentStatus + '%');
              }

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              _Establishment["default"].findAndCountAll({
                where: whereClause,
                include: {
                  association: 'address',
                  where: whereAddress
                },
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (establishment) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: establishment.count,
                    totalPages: Math.ceil(establishment.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  establishments: establishment.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to list establishment!"
                });
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // Mostra o estabelecimento selecionado
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var establishmentId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              establishmentId = req.params.establishmentId;
              _context3.next = 3;
              return _Establishment["default"].findByPk(establishmentId, {
                include: [{
                  association: 'address'
                }, {
                  association: 'contacts'
                }]
              }).then(function (establishment) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  establishment: establishment
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to find establishment"
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
  // Atualiza dados do estabelecimento
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var establishmentId, obj, errorDetails, establishment;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              establishmentId = req.params.establishmentId;
              obj = {
                name: req.body.name,
                cnpj: req.body.cnpj,
                planId: req.body.planId,
                paymentStatus: req.body.paymentStatus
              };
              _context4.next = 4;
              return _ValidatorEstablishment["default"].establishment(obj);

            case 4:
              errorDetails = _context4.sent;

              if (!(errorDetails != 0)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context4.next = 9;
              return _Establishment["default"].findByPk(establishmentId);

            case 9:
              establishment = _context4.sent;

              if (establishment) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Establishment not found!"
              }));

            case 14:
              _Establishment["default"].update(obj, {
                where: {
                  id: establishmentId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Establishment updated!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to update establishment!"
                });
              });

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Deleta o estabelecimento
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var establishmentId, establishment;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              establishmentId = req.params.establishmentId;
              _context5.next = 3;
              return _Establishment["default"].findByPk(establishmentId, {
                include: [{
                  association: 'address'
                }, {
                  association: 'contacts'
                }]
              });

            case 3:
              establishment = _context5.sent;

              if (establishment) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Establishment not found!"
              }));

            case 8:
              _Establishment["default"].destroy({
                where: {
                  id: establishmentId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Establishment deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete establishment"
                });
              });

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // Insere endereço para o estabelecimento
  addressStore: function addressStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var obj, errorDetails, establishment, establishmentAddressId;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
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
              _context6.next = 3;
              return _ValidatorEstablishmentAddress["default"].address(obj);

            case 3:
              errorDetails = _context6.sent;

              if (!(errorDetails != 0)) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 6:
              _context6.next = 8;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 8:
              establishment = _context6.sent;

              if (!(establishment.length == 0)) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Establishment doesn't exist",
                fields: [obj.establishmentId]
              }));

            case 11:
              _context6.next = 13;
              return _EstablishmentAddress["default"].create(obj);

            case 13:
              establishmentAddressId = _context6.sent;

              if (establishmentAddressId) {
                _context6.next = 18;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Establishment address!"
              }));

            case 18:
              return _context6.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Establishment address created!",
                establishmentAddress: obj
              }));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  // Deleta o endereço selecionado
  addressDelete: function addressDelete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var establishmentAddressId, establishmentAddress;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              establishmentAddressId = req.params.establishmentAddressId;
              _context7.next = 3;
              return _EstablishmentAddress["default"].findByPk(establishmentAddressId);

            case 3:
              establishmentAddress = _context7.sent;

              if (establishmentAddress) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Establishment address not found!"
              }));

            case 8:
              _EstablishmentAddress["default"].destroy({
                where: {
                  id: establishmentAddressId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Establishment address deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Establishment address not found!"
                });
              });

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  // Cria o contato do estabelecimento
  contactStore: function contactStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var obj, establishment, establishmentContact;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                phone: req.body.phone,
                email: req.body.email
              }; // Verifica se o estabelecimento existe

              _context8.next = 3;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 3:
              establishment = _context8.sent;

              if (!(establishment.length == 0)) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Establishment doesn't exist",
                fields: [obj.establishmentId]
              }));

            case 6:
              _context8.next = 8;
              return _EstablishmentContact["default"].create(obj);

            case 8:
              establishmentContact = _context8.sent;

              if (establishmentContact) {
                _context8.next = 13;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Establishment contact!"
              }));

            case 13:
              return _context8.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Establishment contact created!",
                establishmentContact: obj
              }));

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  // Deleta o contato 
  contactDelete: function contactDelete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var establishmentContactId, establishmentContact;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              establishmentContactId = req.params.establishmentContactId;
              _context9.next = 3;
              return _EstablishmentContact["default"].findByPk(establishmentContactId);

            case 3:
              establishmentContact = _context9.sent;

              if (establishmentContact) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Establishment contact not found!"
              }));

            case 8:
              _context9.next = 10;
              return _EstablishmentContact["default"].destroy({
                where: {
                  id: establishmentContactId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Establishment contact deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete establishment contact!"
                });
              });

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  // Cria categoria
  categoryStore: function categoryStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var obj, errorDetails, establishment, category;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                name: req.body.name
              };
              _context10.next = 3;
              return _ValidatorCategory["default"].category(obj);

            case 3:
              errorDetails = _context10.sent;

              if (!(errorDetails != 0)) {
                _context10.next = 6;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 6:
              _context10.next = 8;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 8:
              establishment = _context10.sent;

              if (!(establishment.length == 0)) {
                _context10.next = 11;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Establishment doesn't exist",
                fields: [obj.establishmentId]
              }));

            case 11:
              _context10.next = 13;
              return _Category["default"].create(obj);

            case 13:
              category = _context10.sent;

              if (category) {
                _context10.next = 18;
                break;
              }

              return _context10.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create category!"
              }));

            case 18:
              return _context10.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Category created!",
                category: obj
              }));

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  // Deleta a categoria
  categoryDelete: function categoryDelete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      var categoryId, category;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              categoryId = req.params.categoryId;
              _context11.next = 3;
              return _Category["default"].findByPk(categoryId);

            case 3:
              category = _context11.sent;

              if (category) {
                _context11.next = 8;
                break;
              }

              return _context11.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Category not found!"
              }));

            case 8:
              _context11.next = 10;
              return _Category["default"].destroy({
                where: {
                  id: categoryId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Category deleted!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete category!"
                });
              });

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  }
};
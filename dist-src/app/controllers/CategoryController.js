"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

var _ValidatorCategory = _interopRequireDefault(require("../services/ValidatorCategory"));

/* eslint-disable radix */
module.exports = {
  // Cria a categoria
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, establishment, errorDetails, category;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                name: req.body.name
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
              return _ValidatorCategory["default"].category(obj);

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
              return _Category["default"].create(obj, {
                include: [{
                  association: 'establishment'
                }, {
                  association: 'products'
                }]
              });

            case 13:
              category = _context.sent;

              if (category) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create category!'
              }));

            case 16:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Category created!',
                category: obj
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista as categorias
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _Category["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (category) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: category.count,
                    totalPages: Math.ceil(category.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  categories: category.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list category!'
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
  // Mostra a categoria selecionada
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var categoryId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              categoryId = req.params.categoryId;
              _context3.next = 3;
              return _Category["default"].findByPk(categoryId, {
                include: [{
                  association: 'establishment'
                }, {
                  association: 'products'
                }]
              }).then(function (category) {
                if (!category) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Category not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  category: category
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find category'
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
  // Atualiza a categoria
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var categoryId, category, obj, errorDetails;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              categoryId = req.params.categoryId;
              _context4.next = 3;
              return _Category["default"].findByPk(categoryId);

            case 3:
              category = _context4.sent;

              if (category) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Establishment not found!'
              }));

            case 6:
              obj = {
                name: req.body.name
              };
              _context4.next = 9;
              return _ValidatorCategory["default"].category(obj);

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
              _Category["default"].update(obj, {
                where: {
                  id: categoryId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!categoryId) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update category!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Category updated!'
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
  // Deleta a categoria
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var categoryId, category;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              categoryId = req.params.categoryId;
              _context5.next = 3;
              return _Category["default"].findByPk(categoryId, {
                include: [{
                  association: 'establishment'
                }, {
                  association: 'products'
                }]
              });

            case 3:
              category = _context5.sent;

              if (category) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Category not found!'
              }));

            case 6:
              _context5.next = 8;
              return _Category["default"].destroy({
                where: {
                  id: categoryId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!category) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete category!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Category deleted!'
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
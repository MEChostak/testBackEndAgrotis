"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

var _ModelYear = _interopRequireDefault(require("../models/ModelYear"));

var _ValidatorProduct = _interopRequireDefault(require("../services/ValidatorProduct"));

var _CsvList = _interopRequireDefault(require("../models/CsvList"));

/* eslint-disable no-console */

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */

/* eslint-disable consistent-return */

/* eslint-disable radix */

/* eslint-disable no-new-object */

/* eslint-disable eqeqeq */
var Sequelize = require('sequelize');

var fs = require("fs");

var csv = require("fast-csv");

var Op = Sequelize.Op;

var formidable = require('formidable');

var path = require('path');

module.exports = {
  // Criar novo produto
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, category, product;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                establishmentId: req.body.establishmentId,
                categoryName: req.body.categoryName,
                name: req.body.name,
                brand: req.body.brand,
                type: req.body.type,
                size: req.body.size,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                isAvailable: req.body.isAvailable,
                models: {}
              };

              if (req.body.models) {
                obj.models = req.body.models;
              }

              _context.next = 4;
              return _ValidatorProduct["default"].product(obj);

            case 4:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context.next = 9;
              return _Category["default"].findAll({
                limit: 1,
                where: {
                  name: obj.categoryName
                }
              });

            case 9:
              category = _context.sent;

              if (!(category.length == 0)) {
                _context.next = 14;
                break;
              }

              _Category["default"].create({
                establishmentId: req.body.establishmentId,
                name: req.body.categoryName
              });

              if (category) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create category!'
              }));

            case 14:
              _context.next = 16;
              return _Product["default"].create(obj, {
                include: {
                  association: 'models'
                }
              });

            case 16:
              product = _context.sent;

              if (product) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create product!"
              }));

            case 21:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Product created!",
                product: obj
              }));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Tabela modelo/ano
  modelStore: function modelStore(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var obj, model;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              obj = {
                productId: req.body.productId,
                modelId: req.body.modelId,
                modelType: req.body.modelType,
                modelBrand: req.body.modelBrand,
                modelName: req.body.modelName,
                sinceYear: req.body.sinceYear,
                toYear: req.body.toYear
              };
              _context2.next = 3;
              return _ModelYear["default"].create(obj);

            case 3:
              model = _context2.sent;

              if (model) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create model!'
              }));

            case 6:
              return _context2.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'model created!',
                model: obj
              }));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // Lista todos os produtos
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var page, obj, whereClause, whereEstablishment, whereAddress, whereModel;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              page = req.params.page;
              obj = {
                state: req.body.state,
                city: req.body.city,
                establishment: req.body.establishment,
                isAvailable: req.body.isAvailable,
                modelName: req.body.modelName,
                name: req.body.description
              };
              whereClause = new Object();
              whereEstablishment = new Object();
              whereAddress = new Object();
              whereModel = new Object();

              if (obj.state) {
                whereAddress.state = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.state, "%"));
              }

              if (obj.city) {
                whereAddress.city = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.city, "%"));
              }

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.name, "%"));
              }

              if (obj.isAvailable) {
                whereClause.isAvailable = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.isAvailable, "%"));
              }

              if (obj.establishment) {
                whereEstablishment.id = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.establishment, "%"));
              }

              if (obj.modelName) {
                whereModel.modelName = (0, _defineProperty2["default"])({}, Op.like, "%".concat(obj.modelName, "%"));
              }

              _Product["default"].findAndCountAll({
                where: whereClause,
                include: [{
                  association: 'models',
                  where: whereModel
                }, {
                  association: 'establishment',
                  where: whereEstablishment,
                  include: {
                    association: 'address',
                    where: whereAddress
                  }
                }],
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (product) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: product.count,
                    totalPages: Math.ceil(product.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  products: product.rows
                };
                console.log(response);
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list product"
                });
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  // Mostra o produto selecionado
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var productId;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              productId = req.params.productId;
              _context4.next = 3;
              return _Product["default"].findByPk(productId, {
                include: [{
                  association: 'models'
                }, {
                  association: 'establishment',
                  include: {
                    association: 'address'
                  }
                }]
              }).then(function (product) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  product: product
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find product'
                });
              });

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Atualiza o produto
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var productId, obj, errorDetails, product;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              productId = req.params.productId;
              obj = {
                categoryName: req.body.categoryName,
                name: req.body.name,
                brand: req.body.brand,
                type: req.body.type,
                size: req.body.size,
                color: req.body.color,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                isAvailable: req.body.isAvailable
              };
              _context5.next = 4;
              return _ValidatorProduct["default"].product(obj);

            case 4:
              errorDetails = _context5.sent;

              if (!(errorDetails != 0)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: 'Malformed object.',
                fields: errorDetails
              }));

            case 7:
              _context5.next = 9;
              return _Product["default"].findByPk(productId);

            case 9:
              product = _context5.sent;

              if (product) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not found!'
              }));

            case 12:
              _Product["default"].update(obj, {
                where: {
                  id: productId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Product updated!',
                  product: obj
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to update product!'
                });
              });

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // Deleta o produto
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var productId, product;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              productId = req.params.productId;
              _context6.next = 3;
              return _Product["default"].findByPk(productId);

            case 3:
              product = _context6.sent;

              if (product) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not found!'
              }));

            case 6:
              _Product["default"].destroy({
                where: {
                  id: productId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Product deleted!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to delete product!'
                });
              });

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  bulk: function bulk(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var timeStamp, establishment, fileName, filePath, file;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              timeStamp = Date.now();
              establishment = req.files.userpic.name;
              fileName = "products_".concat(establishment, "_").concat(timeStamp, ".csv");
              filePath = path.resolve(__dirname, '..', '..', 'public', fileName);
              file = req.files.userpic.data;
              fs.writeFile(filePath, file, function (err) {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update product!'
                  });
                }
              });
              _context7.next = 8;
              return _CsvList["default"].create({
                fileName: fileName,
                status: 'Pendente'
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'File uploaded!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400);
              });

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  // Lista todos os arquivos CSV
  csvlist: function csvlist(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var page;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              page = req.params.page;

              _CsvList["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (product) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: product.count,
                    totalPages: Math.ceil(product.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  files: product.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list product"
                });
              });

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  }
};
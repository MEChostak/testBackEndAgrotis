"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var CsvList = require("../models/CsvList.js");

var Product = require("../models/Product.js");

var ValidatorProduct = require('../services/ValidatorProduct.js');

function BulkStore(_x, _x2) {
  return _BulkStore.apply(this, arguments);
}

<<<<<<< HEAD
function _BulkStore() {
  _BulkStore = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var fs, path, fastcsv, file, id, name, filePath, stream, products, errorList, streamCsv;
=======
function _BulkCreate() {
  _BulkCreate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var CsvList, Product, ValidatorProduct, fs, path, fastcsv, file, id, name, filePath, stream, products, errorList, streamCsv;
>>>>>>> ed54bbac028f6ac18d0a4d1aac90f33d0b86af94
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
<<<<<<< HEAD
            fs = require('fs');
            path = require('path');
            fastcsv = require('fast-csv');
            file = CsvList.findAll({
=======
            CsvList = require("../models/CsvList");
            Product = require("../models/Product");
            ValidatorProduct = require('../services/ValidatorProduct');
            fs = require('fs');
            path = require('path');
            fastcsv = require('fast-csv');
            _context2.next = 8;
            return CsvList.findAll({
>>>>>>> ed54bbac028f6ac18d0a4d1aac90f33d0b86af94
              limit: 1,
              where: {
                status: 'Pendente'
              }
            });

            if (!(file.length == 0)) {
              _context2.next = 7;
              break;
            }

            console.log('Sem arquivos pendentes');
            return _context2.abrupt("return");

          case 7:
            id = file[0].id;
            name = file[0].fileName;
            filePath = path.resolve(__dirname, '..', '..', 'public', "".concat(name));
            stream = fs.createReadStream(filePath);
            products = [];
            errorList = [];
            streamCsv = fastcsv.parse({
              headers: ['establishmentId', 'categoryName', 'name', 'brand', 'type', 'size', 'color', 'description', 'price', 'isAvailable', 'quantity', 'modelType', 'modelBrand', 'modelName', 'sinceYear', 'toYear'],
              skipRows: 5,
              delimiter: ',',
              quote: '"'
            }).on('error', function (error) {
              return console.log(error);
            }).on('data', /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
                var available, obj, errorDetails, wrongObj;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        available = true;

                        if (data.isAvailable != "Sim") {
                          available = false;
                        } else {
                          available = true;
                        }

                        obj = {
                          establishmentId: data.establishmentId,
                          categoryName: data.categoryName,
                          name: data.name,
                          brand: data.brand,
                          type: data.type,
                          size: data.size,
                          color: data.color,
                          description: data.description,
                          price: data.price,
                          quantity: data.quantity,
                          isAvailable: available,
                          models: {
                            modelType: data.modelType,
                            modelBrand: data.modelBrand,
                            modelName: data.modelName,
                            sinceYear: data.sinceYear,
                            toYear: data.toYear
                          }
                        };
                        _context.next = 5;
                        return ValidatorProduct.product(obj);

                      case 5:
                        errorDetails = _context.sent;

                        if (errorDetails != 0) {
                          wrongObj = {
                            establishmentId: data.establishmentId,
                            categoryName: data.categoryName,
                            name: data.name,
                            brand: data.brand,
                            type: data.type,
                            size: data.size,
                            color: data.color,
                            description: data.description,
                            price: data.price,
                            quantity: data.quantity,
                            isAvailable: available,
                            modelType: data.modelType,
                            modelBrand: data.modelBrand,
                            modelName: data.modelName,
                            sinceYear: data.sinceYear,
                            toYear: data.toYear
                          };
                          errorList.push(wrongObj);
                        } else {
                          products.push(obj);
                        }

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()).on('end', function () {
              var status = '';
              products.length == 0 ? status = 'Erro' : 'Processado';
              Product.bulkCreate(products, {
                include: {
                  association: 'models'
                }
              }).then(function () {
                return fastcsv.writeToPath(path.resolve(__dirname, '..', '..', 'public', 'errors', "ERRORS_".concat(name)), errorList).on('error', function (err) {
                  return console.error(err);
                }).on('finish', function () {
                  return CsvList.update({
                    status: status
                  }, {
                    where: {
                      id: id
                    }
                  }).then(function (result) {
                    console.log(result);
                  })["catch"](function (err) {
                    return console.log(err);
                  });
                });
              })["catch"](function (err) {
                return console.log(err);
              });
            });
            stream.pipe(streamCsv);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _BulkStore.apply(this, arguments);
}

module.exports = BulkStore;
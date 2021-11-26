"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _User = _interopRequireDefault(require("../models/User"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Establishment = _interopRequireDefault(require("../models/Establishment"));

var _OrderStatus = _interopRequireDefault(require("../models/OrderStatus"));

var _StatusLog = _interopRequireDefault(require("../models/StatusLog"));

var _DiscountCoupon = _interopRequireDefault(require("../models/DiscountCoupon"));

var _ChatLog = _interopRequireDefault(require("../models/ChatLog"));

/* eslint-disable radix */

/* eslint-disable no-await-in-loop */
module.exports = {
  // Cria o pedido e o liga ao usuário que o fez e ao estabelecimento no qual foi feito
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var productList, totalPrice, status, obj, user, establishment, i, product, productCheck, discount, finalPrice, order;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              productList = req.body.productList.map(function (prod) {
                return prod;
              });
              totalPrice = [0];
              _context.next = 4;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 1
                }
              });

            case 4:
              status = _context.sent;
              status = status[0].dataValues;
              obj = {
                userId: req.body.userId,
                establishmentId: req.body.establishmentId,
                productList: req.body.productList,
                status: [status.id, status.message],
                totalPrice: [],
                discountCoupon: req.body.discountCoupon,
                finalPrice: []
              };
              _context.next = 9;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  id: obj.userId
                }
              });

            case 9:
              user = _context.sent;

              if (!(user == 0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "The user doesn't exist!"
              }));

            case 12:
              user = user[0].dataValues;
              _context.next = 15;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 15:
              establishment = _context.sent;

              if (!(establishment == 0)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "The stablishment doesn't exist!"
              }));

            case 18:
              establishment = establishment[0].dataValues;

              if (!productList) {
                _context.next = 42;
                break;
              }

              i = 0;

            case 21:
              if (!(i < productList.length)) {
                _context.next = 42;
                break;
              }

              _context.next = 24;
              return _Product["default"].findByPk(productList[i].id);

            case 24:
              product = _context.sent;
              productCheck = product.dataValues;

              if (productCheck.id) {
                _context.next = 28;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not found'
              }));

            case 28:
              if (!(product.quantity > 0)) {
                _context.next = 33;
                break;
              }

              _context.next = 31;
              return _Product["default"].update({
                quantity: parseInt(productCheck.quantity) - parseInt(productList[i].quantity),
                isAvailable: true
              }, {
                where: {
                  id: productCheck.id
                }
              });

            case 31:
              _context.next = 36;
              break;

            case 33:
              if (!(product.quantity <= 0)) {
                _context.next = 36;
                break;
              }

              _context.next = 36;
              return _Product["default"].update({
                quantity: 0,
                isAvailable: false
              }, {
                where: {
                  id: productCheck.id
                }
              });

            case 36:
              if (!(productCheck.isAvailable != true || productCheck.quantity <= 0)) {
                _context.next = 38;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not available!'
              }));

            case 38:
              // Define o preço de cada produto do pedido de acordo com a quantidade de cada um
              totalPrice.push(parseFloat(productCheck.price) * parseInt(productList[i].quantity));

            case 39:
              i++;
              _context.next = 21;
              break;

            case 42:
              // Define o preço total de acordo com os preços cadastrados
              totalPrice = totalPrice.reduce(function (total, price) {
                return total + price;
              }).toFixed(2);
              obj.totalPrice.push(totalPrice); // Aplica o cupom de desconto ao pedido

              _context.next = 46;
              return _DiscountCoupon["default"].findAll({
                limit: 1,
                where: {
                  name: obj.discountCoupon
                }
              });

            case 46:
              discount = _context.sent;

              if (discount.length == 0) {
                obj.finalPrice.push(totalPrice);
                obj.discountCoupon = '';
              } else {
                discount = discount[0].dataValues;
                finalPrice = totalPrice - totalPrice * discount.discountValue;
                obj.finalPrice.push(parseFloat(finalPrice).toFixed(2));
              } // Cria o pedido na tabela de pedidos


              _context.next = 50;
              return _Order["default"].create(obj);

            case 50:
              order = _context.sent;

              if (order) {
                _context.next = 53;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create order!'
              }));

            case 53:
              _context.next = 55;
              return _StatusLog["default"].create({
                orderId: order.id,
                log: {
                  status: status.id,
                  message: status.message
                }
              });

            case 55:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Order created!',
                order: obj
              }));

            case 56:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os pedidos feitos
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _Order["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (order) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: order.count,
                    totalPages: Math.ceil(order.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  orders: order.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list order'
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
  // Mostra o pedido selecionado
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var orderId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              orderId = req.params.orderId;
              _context3.next = 3;
              return _Order["default"].findByPk(orderId, {
                include: [{
                  association: 'user'
                }, {
                  association: 'establishment'
                }, {
                  association: 'logs'
                }]
              }).then(function (order) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  order: order
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find order'
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
  // Atualiza o pedido
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var orderId, obj, productList, totalPrice, order, user, establishment, i, product, productCheck, discount, finalPrice;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              orderId = req.params.orderId;
              obj = {
                userId: req.body.userId,
                establishmentId: req.body.establishmentId,
                productList: req.body.productList,
                totalPrice: [],
                discountCoupon: req.body.discountCoupon,
                finalPrice: []
              };
              productList = req.body.productList.map(function (prod) {
                return prod;
              });
              totalPrice = [0];
              _context4.next = 6;
              return _Order["default"].findByPk(orderId);

            case 6:
              order = _context4.sent;

              if (order) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 9:
              _context4.next = 11;
              return _User["default"].findAll({
                limit: 1,
                where: {
                  id: obj.userId
                }
              });

            case 11:
              user = _context4.sent;

              if (!(user == 0)) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "The user doesn't exist!"
              }));

            case 14:
              user = user[0].dataValues;
              _context4.next = 17;
              return _Establishment["default"].findAll({
                limit: 1,
                where: {
                  id: obj.establishmentId
                }
              });

            case 17:
              establishment = _context4.sent;

              if (!(establishment == 0)) {
                _context4.next = 20;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "The stablishment doesn't exist!"
              }));

            case 20:
              establishment = establishment[0].dataValues;

              if (!productList) {
                _context4.next = 43;
                break;
              }

              i = 0;

            case 23:
              if (!(i < productList.length)) {
                _context4.next = 43;
                break;
              }

              _context4.next = 26;
              return _Product["default"].findByPk(productList[i].id);

            case 26:
              product = _context4.sent;
              productCheck = product.dataValues;

              if (productCheck.id) {
                _context4.next = 30;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not found'
              }));

            case 30:
              if (!(product.quantity > 0)) {
                _context4.next = 35;
                break;
              }

              _context4.next = 33;
              return _Product["default"].update({
                quantity: parseInt(productCheck.quantity) - parseInt(productList[i].quantity)
              }, {
                where: {
                  id: productCheck.id
                }
              });

            case 33:
              _context4.next = 37;
              break;

            case 35:
              _context4.next = 37;
              return _Product["default"].update({
                quantity: 0,
                isAvailable: false
              }, {
                where: {
                  id: productCheck.id
                }
              });

            case 37:
              if (!(productCheck.isAvailable != true || productCheck.quantity <= 0)) {
                _context4.next = 39;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Product not available!'
              }));

            case 39:
              // Define o preço de cada produto do pedido de acordo com a quantidade de cada um
              totalPrice.push(parseFloat(productCheck.price) * parseInt(productList[i].quantity));

            case 40:
              i++;
              _context4.next = 23;
              break;

            case 43:
              // Define o preço total de acordo com os preços cadastrados
              totalPrice = totalPrice.reduce(function (total, price) {
                return total + price;
              }).toFixed(2);
              obj.totalPrice.push(totalPrice);
              _context4.next = 47;
              return _DiscountCoupon["default"].findAll({
                limit: 1,
                where: {
                  name: obj.discountCoupon
                }
              });

            case 47:
              discount = _context4.sent;

              if (discount.length == 0) {
                obj.finalPrice.push(totalPrice);
                obj.discountCoupon = '';
              } else {
                discount = discount[0].dataValues;
                finalPrice = totalPrice - totalPrice * discount.discountValue;
                obj.finalPrice.push(parseFloat(finalPrice).toFixed(2));
              }

              _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Order updated!'
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to update order!'
                });
              });

            case 50:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Deleta o pedido e devolve os itens ao estoque
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var orderId, order, orderCheck, i, product, productCheck;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              orderId = req.params.orderId;
              _context5.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context5.sent;

              if (order) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              orderCheck = order.dataValues.productList.map(function (prod) {
                return prod;
              });

              if (!orderCheck) {
                _context5.next = 19;
                break;
              }

              i = 0;

            case 9:
              if (!(i < orderCheck.length)) {
                _context5.next = 19;
                break;
              }

              _context5.next = 12;
              return _Product["default"].findByPk(orderCheck[i].id);

            case 12:
              product = _context5.sent;
              productCheck = product.dataValues;
              _context5.next = 16;
              return _Product["default"].update({
                quantity: parseInt(productCheck.quantity) + parseInt(orderCheck[i].quantity),
                isAvailable: true
              }, {
                where: {
                  id: productCheck.id
                }
              });

            case 16:
              i++;
              _context5.next = 9;
              break;

            case 19:
              _Order["default"].destroy({
                where: {
                  id: orderId
                }
              }).then(function (result) {
                console.log(result);
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to delete order!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Order deleted!'
                });
              });

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // Log do chat
  chatlog: function chatlog(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var obj;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              obj = {
                orderId: req.body.orderId,
                message: req.body.message
              };

              _ChatLog["default"].create(obj).then(function (result) {
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Chat log created!',
                  product: obj
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Fail to create chat log!'
                });
              });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
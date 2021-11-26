"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _DiscountCoupon = _interopRequireDefault(require("../models/DiscountCoupon"));

var _Order = _interopRequireDefault(require("../models/Order"));

module.exports = {
  // Criar novo cupom de desconto
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, discount;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                discountValue: req.body.discountValue
              };
              _context.next = 3;
              return _DiscountCoupon["default"].create(obj);

            case 3:
              discount = _context.sent;

              if (discount) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Fail to create discount coupon!'
              }));

            case 6:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: 'Discount coupon created!',
                discount: obj
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Lista os cupons cadastrados
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var page;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              page = req.params.page;
              _context2.next = 3;
              return _DiscountCoupon["default"].findAndCountAll({
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id']]
              }).then(function (coupon) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: coupon.count,
                    totalPages: Math.ceil(coupon.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  coupons: coupon.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list coupons!'
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
  // Lista os pedidos realizados utilizando o cupom especificado
  discountList: function discountList(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var discount, page, discountCheck, orders, totalValue, i, orderCheck, price;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              discount = req.params.discountName;
              page = req.params.page;
              _context3.next = 4;
              return _DiscountCoupon["default"].findAll({
                where: {
                  name: discount
                }
              });

            case 4:
              discountCheck = _context3.sent;

              if (!(discountCheck.length == 0)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Failed to list orders, discount coupon doesn't exist!"
              }));

            case 7:
              discountCheck = discountCheck[0].dataValues;
              _context3.next = 10;
              return _Order["default"].findAll({
                where: {
                  discountCoupon: discountCheck.name
                }
              });

            case 10:
              orders = _context3.sent;
              totalValue = [0];

              if (!orders) {
                _context3.next = 24;
                break;
              }

              i = 0;

            case 14:
              if (!(i < orders.length)) {
                _context3.next = 24;
                break;
              }

              _context3.next = 17;
              return _Order["default"].findByPk(orders[i].id);

            case 17:
              orderCheck = _context3.sent;
              orderCheck = orderCheck.dataValues;
              price = parseFloat(orderCheck.finalPrice);
              totalValue.push(price);

            case 21:
              i++;
              _context3.next = 14;
              break;

            case 24:
              totalValue = totalValue.reduce(function (a, b) {
                return a + b;
              });
              _context3.next = 27;
              return _Order["default"].findAndCountAll({
                where: {
                  discountCoupon: discountCheck.name
                },
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
                  totalValue: totalValue.toFixed(2),
                  orders: order.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to list orders'
                });
              });

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  // Mostra o cupom selecionado
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var couponName;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              couponName = req.params.couponName;
              _context4.next = 3;
              return _DiscountCoupon["default"].findAll({
                where: {
                  name: couponName
                }
              }).then(function (coupon) {
                if (!coupon) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Discount coupon not found!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  coupon: coupon
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: 'Failed to find discount coupon'
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
  // Deleta o cupom selecionado
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var couponName, coupon, obj;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              couponName = req.params.couponName;
              _context5.next = 3;
              return _DiscountCoupon["default"].findAll({
                where: {
                  name: couponName
                }
              });

            case 3:
              coupon = _context5.sent;

              if (coupon) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Discount coupon not found!'
              }));

            case 6:
              obj = {
                name: req.body.name,
                discountValue: req.body.discountValue
              };
              _context5.next = 9;
              return _DiscountCoupon["default"].update(obj, {
                where: {
                  name: couponName
                }
              }).then(function (result) {
                if (!couponName) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update discount coupon!'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Discount coupon updated!'
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
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var couponName, coupon;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              couponName = req.params.couponName;
              _context6.next = 3;
              return _DiscountCoupon["default"].findAll({
                where: {
                  name: couponName
                }
              });

            case 3:
              coupon = _context6.sent;

              if (coupon) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Coupon not found!'
              }));

            case 6:
              _context6.next = 8;
              return _DiscountCoupon["default"].destroy({
                where: {
                  name: couponName
                }
              }).then(function (result) {
                if (!coupon) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Failed to delete discount coupon'
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: 'Discount coupon deleted!'
                });
              });

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
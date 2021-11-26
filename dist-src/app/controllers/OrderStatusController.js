"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _OrderStatus = _interopRequireDefault(require("../models/OrderStatus"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _StatusLog = _interopRequireDefault(require("../models/StatusLog"));

module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Cria os status fixos que deverão ser usados,
              // se forem adicionados novos status, os updates e rotas
              // deverão ser atualizados também
              obj = {// message: "Order registered"          /* id 1 */
                // message: "Order confirmed"           /* id 2 */
                // message: "Searching delivery person" /* id 3 */
                // message: "Delivery person found"     /* id 4 */
                // message: "Order on the way"          /* id 5 */
                // message: "Order delivered"           /* id 6 */
                // message: "Order returned"            /* id 7 */
                // message: "Order cancelled"           /* id 10 */
              };
              _context.next = 3;
              return _OrderStatus["default"].create(obj);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  // Atualiza o pedido selecionado para o status 2 - Pedido confirmado
  update2: function update2(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              orderId = req.params.orderId;
              _context2.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context2.sent;

              if (order) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context2.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 2
                }
              });

            case 8:
              status = _context2.sent;
              obj = {
                status: status[0].dataValues
              };
              _context2.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  // Atualiza o pedido selecionado para o status 3 - Procurando entregador
  update3: function update3(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              orderId = req.params.orderId;
              _context3.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context3.sent;

              if (order) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context3.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 3
                }
              });

            case 8:
              status = _context3.sent;
              obj = {
                status: status[0].dataValues
              };
              _context3.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  // Atualiza o pedido selecionado para o status 4 - Entregador encontrado
  update4: function update4(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              orderId = req.params.orderId;
              _context4.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context4.sent;

              if (order) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context4.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 4
                }
              });

            case 8:
              status = _context4.sent;
              obj = {
                status: status[0].dataValues
              };
              _context4.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Atualiza o pedido selecionado para o status 5 - Pedido à caminho
  update5: function update5(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var orderId, order, status, obj;
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
              _context5.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 5
                }
              });

            case 8:
              status = _context5.sent;
              obj = {
                status: status[0].dataValues
              };
              _context5.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  // Atualiza o pedido selecionado para o status 6 - Pedido entregue
  update6: function update6(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              orderId = req.params.orderId;
              _context6.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context6.sent;

              if (order) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context6.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 6
                }
              });

            case 8:
              status = _context6.sent;
              obj = {
                status: status[0].dataValues
              };
              _context6.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  // Atualiza o pedido selecionado para o status 7 - Pedido em devolução
  update7: function update7(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              orderId = req.params.orderId;
              _context7.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context7.sent;

              if (order) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context7.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 7
                }
              });

            case 8:
              status = _context7.sent;
              obj = {
                status: status[0].dataValues
              };
              _context7.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  // Atualiza o pedido selecionado para o status 10 - Pedido cancelado
  update10: function update10(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var orderId, order, status, obj;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              orderId = req.params.orderId;
              _context8.next = 3;
              return _Order["default"].findByPk(orderId);

            case 3:
              order = _context8.sent;

              if (order) {
                _context8.next = 6;
                break;
              }

              return _context8.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: 'Order not found!'
              }));

            case 6:
              _context8.next = 8;
              return _OrderStatus["default"].findAll({
                where: {
                  id: 10
                }
              });

            case 8:
              status = _context8.sent;
              obj = {
                status: status[0].dataValues
              };
              _context8.next = 12;
              return _Order["default"].update(obj, {
                where: {
                  id: orderId
                }
              }).then(function (result) {
                if (!order) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: 'Fail to update order status!'
                  });
                }

                _StatusLog["default"].create({
                  orderId: orderId,
                  log: {
                    status: status[0].id,
                    message: status[0].message
                  }
                }, {
                  include: {
                    association: 'order'
                  }
                });

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Order ".concat(orderId, " status updated!"),
                  status: status
                });
              });

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var status, page, statusCheck;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              status = req.params.status;
              page = req.params.page;
              _context9.next = 4;
              return _OrderStatus["default"].findAll({
                where: {
                  id: status
                }
              });

            case 4:
              statusCheck = _context9.sent;
              statusCheck = statusCheck[0].dataValues;
              _context9.next = 8;
              return _Order["default"].findAndCountAll({
                where: {
                  status: statusCheck
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

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  }
};
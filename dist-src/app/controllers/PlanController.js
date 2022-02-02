"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Plan = _interopRequireDefault(require("../models/Plan"));

var _Organization = _interopRequireDefault(require("../models/Organization"));

var _ValidatorPlan = _interopRequireDefault(require("../services/ValidatorPlan"));

var Sequelize = require('sequelize');

var Op = Sequelize.Op;
module.exports = {
  store: function store(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var obj, errorDetails, register, plan;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              obj = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                timeCourse: req.body.timeCourse
              }; // Valida o objeto

              _context.next = 3;
              return _ValidatorPlan["default"].Plan(obj);

            case 3:
              errorDetails = _context.sent;

              if (!(errorDetails != 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 6:
              _context.next = 8;
              return _Plan["default"].findAll({
                limit: 1,
                where: {
                  name: obj.name,
                  price: obj.price
                }
              });

            case 8:
              register = _context.sent;

              if (!(register.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Plan already registered.",
                fields: [obj.name, obj.price]
              }));

            case 11:
              _context.next = 13;
              return _Plan["default"].create(obj
              /* , {
               include: [
                   { association: 'organization' }
               ]
              } */
              );

            case 13:
              plan = _context.sent;

              if (plan) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Fail to create Plan!"
              }));

            case 18:
              return _context.abrupt("return", res.status(200).json({
                timestamp: Date.now(),
                ok: true,
                message: "Plan created!"
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  update: function update(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var planId, obj, errorDetails, plan;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              planId = req.params.planId;
              obj = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
              }; // Valida o objeto

              _context2.next = 4;
              return _ValidatorPlan["default"].Plan(obj);

            case 4:
              errorDetails = _context2.sent;

              if (!(errorDetails != 0)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                error: "Malformed object.",
                fields: errorDetails
              }));

            case 7:
              _context2.next = 9;
              return _Plan["default"].findByPk(planId);

            case 9:
              plan = _context2.sent;

              if (plan) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Plan not found!"
              }));

            case 12:
              // Altera o plano
              _Plan["default"].update(obj, {
                where: {
                  id: planId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Updated plan!"
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to update plan!"
                });
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  show: function show(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var planId;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              planId = req.params.planId; // Pesquisa pelo Id

              _Plan["default"].findByPk(planId, // inclui na pesquisa todos os itens relacionados
              {
                include: [{
                  association: 'organization'
                }]
              }).then(function (plan) {
                console.log(plan);

                if (!plan) {
                  return res.status(400).json({
                    timestamp: Date.now(),
                    ok: false,
                    message: "Plan not found!"
                  });
                }

                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "",
                  data: plan
                });
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to find plan!"
                });
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  list: function list(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var page, obj, Op, whereClause;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              page = req.params.page;
              obj = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                timeCourse: req.body.timeCourse,
                country: req.body.country,
                city: req.body.city,
                state: req.body.state
              };
              Op = Sequelize.Op;
              whereClause = new Object();

              if (obj.name) {
                whereClause.name = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.name + '%');
              }

              if (obj.description) {
                whereClause.description = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.description + '%');
              }

              if (obj.price) {
                whereClause.price = obj.price;
              }

              if (obj.timeCourse) {
                whereClause.timeCourse = obj.timeCourse;
              }

              if (obj.organizationId) {
                whereClause.organizationId = obj.organizationId;
              }

              if (obj.country) {
                whereClause.country = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.country + '%');
              }

              if (obj.city) {
                whereClause.city = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.city + '%');
              }

              if (obj.state) {
                whereClause.state = (0, _defineProperty2["default"])({}, Op.like, '%' + obj.state + '%');
              }

              console.log(obj);

              _Plan["default"].findAndCountAll({
                where: whereClause,
                // include: [
                //     { association: 'organization' },
                // ],
                limit: parseInt(process.env.PER_PAGE),
                offset: (page - 1) * parseInt(process.env.PER_PAGE),
                order: [['id', 'DESC']]
              }).then(function (plan) {
                var response = {
                  timestamp: Date.now(),
                  ok: true,
                  info: {
                    totalRows: plan.count,
                    totalPages: Math.ceil(plan.count / parseInt(process.env.PER_PAGE)),
                    page: page
                  },
                  elements: plan.rows
                };
                return res.status(200).json(response);
              })["catch"](function (err) {
                console.log(err);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Failed to list plan!"
                });
              });

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  "delete": function _delete(req, res) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var planId, plan;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              planId = req.params.planId; // Verifica se o plano existe

              _context5.next = 3;
              return _Plan["default"].findByPk(planId);

            case 3:
              plan = _context5.sent;

              if (plan) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).json({
                timestamp: Date.now(),
                ok: false,
                message: "Plan not found!"
              }));

            case 6:
              // Deleta o plan
              _Plan["default"].destroy({
                where: {
                  id: planId
                }
              }).then(function (result) {
                console.log(result);
                return res.status(200).json({
                  timestamp: Date.now(),
                  ok: true,
                  message: "Deleted plan!"
                });
              })["catch"](function (err) {
                console.log(result);
                return res.status(400).json({
                  timestamp: Date.now(),
                  ok: false,
                  message: "Fail to delete plan!"
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("./app/controllers/UserController"));

var _DeliveryUserController = _interopRequireDefault(require("./app/controllers/DeliveryUserController"));

var _EstablishmentController = _interopRequireDefault(require("./app/controllers/EstablishmentController"));

var _ProductController = _interopRequireDefault(require("./app/controllers/ProductController"));

var _OrderController = _interopRequireDefault(require("./app/controllers/OrderController"));

var _OrderStatusController = _interopRequireDefault(require("./app/controllers/OrderStatusController"));

var _DiscountCouponController = _interopRequireDefault(require("./app/controllers/DiscountCouponController"));

var _Auth = _interopRequireDefault(require("./app/middlewares/Auth"));

var routes = new _express.Router();
routes.post('/user/login', _UserController["default"].login);
routes.post('/app/login', _UserController["default"].appLogin);
/** * USER  ** */

routes.post('/user/list/:page', _Auth["default"].middleware, _UserController["default"].list);
routes.get('/user/show/:userId', _Auth["default"].middleware, _UserController["default"].show);
routes.post('/user/store', _Auth["default"].middleware, _UserController["default"].store);
routes.patch('/user/update/:userId', _Auth["default"].middleware, _UserController["default"].update);
routes["delete"]('/user/delete/:userId', _Auth["default"].middleware, _UserController["default"]["delete"]);
/** * DELIVERY_USER  ** */

routes.get('/deliveryUser/list/:page', _Auth["default"].middleware, _DeliveryUserController["default"].list);
routes.get('/deliveryUser/show/:deliveryUserId', _Auth["default"].middleware, _DeliveryUserController["default"].show);
routes.post('/deliveryUser/store', _Auth["default"].middleware, _DeliveryUserController["default"].store);
routes.post('/docDeliveryUser/store', _Auth["default"].middleware, _DeliveryUserController["default"].store);
routes.patch('/deliveryUser/update/:deliveryUserId', _Auth["default"].middleware, _DeliveryUserController["default"].update);
routes["delete"]('/deliveryUser/delete/:deliveryUserId', _Auth["default"].middleware, _DeliveryUserController["default"]["delete"]);
/* ** USER ADDRESS ** */

routes.post('/address/store', _Auth["default"].middleware, _UserController["default"].addressStore);
routes["delete"]('/address/delete/:addressId', _Auth["default"].middleware, _UserController["default"].addressDelete);
/* ** PAYMENT ** */

routes.post('/payment/store', _Auth["default"].middleware, _UserController["default"].paymentStore);
routes["delete"]('/payment/delete/:paymentId', _Auth["default"].middleware, _UserController["default"].paymentDelete);
/* ** ESTABLISHMENT ** */

routes.post('/establishment/list/:page', _Auth["default"].middleware, _EstablishmentController["default"].list);
routes.get('/establishment/show/:establishmentId', _Auth["default"].middleware, _EstablishmentController["default"].show);
routes.post('/establishment/store', _Auth["default"].middleware, _EstablishmentController["default"].store);
routes.patch('/establishment/update/:establishmentId', _Auth["default"].middleware, _EstablishmentController["default"].update);
routes["delete"]('/establishment/delete/:establishmentId', _Auth["default"].middleware, _EstablishmentController["default"]["delete"]);
/* ** ESTABLISHMENT ADRESS ** */

routes.post('/establishment-address/store', _Auth["default"].middleware, _EstablishmentController["default"].addressStore);
routes["delete"]('/establishment-address/delete/:establishmentAddressId', _Auth["default"].middleware, _EstablishmentController["default"].addressDelete);
/* ** ESTABLISHMENT CONTACT ** */

routes.post('/establishment-contact/store', _Auth["default"].middleware, _EstablishmentController["default"].contactStore);
routes["delete"]('/establishment-contact/delete/:establishmentContactId', _Auth["default"].middleware, _EstablishmentController["default"].contactDelete);
/* ** CATEGORY ** */

routes.post('/category/store', _Auth["default"].middleware, _EstablishmentController["default"].categoryStore);
routes["delete"]('/category/delete/:categoryId', _Auth["default"].middleware, _EstablishmentController["default"].categoryDelete);
/* ** PRODUCT ** */

routes.post('/product/list/:page', _Auth["default"].middleware, _ProductController["default"].list);
routes.get('/product/show/:productId', _Auth["default"].middleware, _ProductController["default"].show);
routes.post('/product/store', _Auth["default"].middleware, _ProductController["default"].store);
routes.post('/product-model/store', _Auth["default"].middleware, _ProductController["default"].modelStore);
routes.patch('/product/update/:productId', _Auth["default"].middleware, _ProductController["default"].update);
routes["delete"]('/product/delete/:productId', _Auth["default"].middleware, _ProductController["default"]["delete"]);
routes.post('/product/bulk', _Auth["default"].middleware, _ProductController["default"].bulk);
routes.get('/product/csvlist/:page', _Auth["default"].middleware, _ProductController["default"].csvlist);
/* ** ORDER ** */

routes.get('/order/list/:page', _Auth["default"].middleware, _OrderController["default"].list);
routes.get('/order/show/:orderId', _Auth["default"].middleware, _OrderController["default"].show);
routes.post('/order/store', _Auth["default"].middleware, _OrderController["default"].store);
routes.patch('/order/update/:orderId', _Auth["default"].middleware, _OrderController["default"].update);
routes["delete"]('/order/delete/:orderId', _Auth["default"].middleware, _OrderController["default"]["delete"]);
/* ** CHAT LOG ** */

routes.post('/order/chatlog/store', _Auth["default"].middleware, _OrderController["default"].chatlog);
/* ** ORDER STATUS ** */

routes.post('/order-status/store', _Auth["default"].middleware, _OrderStatusController["default"].store);
routes.get('/order-status/list/:status/:page', _Auth["default"].middleware, _OrderStatusController["default"].list);
routes.patch('/order-status/update2/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update2);
routes.patch('/order-status/update3/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update3);
routes.patch('/order-status/update4/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update4);
routes.patch('/order-status/update5/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update5);
routes.patch('/order-status/update6/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update6);
routes.patch('/order-status/update7/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update7);
routes.patch('/order-status/update10/:orderId', _Auth["default"].middleware, _OrderStatusController["default"].update10);
/* ** DISCOUNT COUPON ** */

routes.post('/discount-coupon/store', _Auth["default"].middleware, _DiscountCouponController["default"].store);
routes.get('/discount-coupon/list/:page', _Auth["default"].middleware, _DiscountCouponController["default"].list);
routes.get('/discount-coupon/list/:discountName/:page', _Auth["default"].middleware, _DiscountCouponController["default"].discountList);
routes.get('/discount-coupon/show/:couponName', _Auth["default"].middleware, _DiscountCouponController["default"].show);
routes.patch('/discount-coupon/update/:couponName', _Auth["default"].middleware, _DiscountCouponController["default"].update);
routes["delete"]('/discount-coupon/delete/:couponName', _Auth["default"].middleware, _DiscountCouponController["default"]["delete"]);
var _default = routes;
exports["default"] = _default;
import { Router } from 'express';
/*  */
// @ts-ignore
import UserController from './app/controllers/UserController';
// @ts-ignore
import PlanController from './app/controllers/PlanController';
// @ts-ignore
import PersonController from './app/controllers/PersonController';
// @ts-ignore
import OrganizationController from './app/controllers/OrganizationController';
// @ts-ignore
import TableController from './app/controllers/TableController';
import Auth from './app/middlewares/Auth';
// @ts-ignore
import PdfController from './app/controllers/PdfController';
// @ts-ignore
import CustomerReadingController from './app/controllers/CustomerReadingController';

// @ts-ignore
const routes = new Router();

routes.post('/user/login', UserController.login);

/** * USER  ** */
routes.post('/user/list/:page', Auth.middleware, UserController.list);
routes.get('/user/show/:userId', Auth.middleware, UserController.show);
routes.post('/user/store', Auth.middleware, UserController.store);
routes.patch('/user/update/:userId' /* , Auth.middleware */ , UserController.update);
routes.delete('/user/delete/:userId', Auth.middleware, UserController.delete);

/** * CUSTOMERS READING  ** */
routes.post('/customer/list/:page', /* Auth.middleware, */ CustomerReadingController.list);
routes.get('/customer/show/:customerId', Auth.middleware, CustomerReadingController.show);
routes.post('/customer/store', /* Auth.middleware, */ CustomerReadingController.store);
routes.patch('/customer/update/:customerId' /* , Auth.middleware */ , CustomerReadingController.update);
routes.delete('/customer/delete/:customerId', Auth.middleware, CustomerReadingController.delete);

/** * ORGANIZATION ** */
routes.post('/organization/list/:page', Auth.middleware, OrganizationController.list);
routes.post('/organization/store', Auth.middleware, OrganizationController.store);
routes.patch('/organization/update/:organizationId', Auth.middleware, OrganizationController.update);
routes.get('/organization/show/:organizationId', Auth.middleware, OrganizationController.show);
routes.delete('/organization/delete/:organizationId', Auth.middleware, OrganizationController.delete);

/** * PLAN  ** */

routes.post('/plan/list/:page', Auth.middleware, PlanController.list);
routes.post('/plan/store', Auth.middleware, PlanController.store);
routes.patch('/plan/update/:planId', Auth.middleware, PlanController.update);
routes.get('/plan/show/:planId', Auth.middleware, PlanController.show);
routes.delete('/plan/delete/:planId', Auth.middleware, PlanController.delete);

/** * PERSON  ** */

routes.post('/person/list/:page', /* Auth.middleware, */ PersonController.list);
routes.post('/person/store', /* Auth.middleware, */ PersonController.store);
routes.patch('/person/update/:personId', /* Auth.middleware, */ PersonController.update);
routes.get('/person/show/:personId', /* Auth.middleware, */ PersonController.show);
routes.delete('/person/delete/:personId', /* Auth.middleware, */ PersonController.delete);

/** * TABLE  ** */

routes.post('/table/list/:page', Auth.middleware, TableController.list);
routes.post('/table/store', Auth.middleware, TableController.store);
routes.patch('/table/update/:tableId', Auth.middleware, TableController.update);
routes.get('/table/show/:tableId', Auth.middleware, TableController.show);
routes.delete('/table/delete/:tableId', Auth.middleware, TableController.delete);

/** * PDF  ** */

routes.post('/pdf/bulk', Auth.middleware, PdfController.bulk);
routes.patch('/pdf/update/:pdfId', Auth.middleware, PdfController.update);


export default routes;
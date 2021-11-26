import { Router } from 'express';
/*  */
import UserController from './app/controllers/UserController';
import PlanController from './app/controllers/PlanController';
import OrganizationController from './app/controllers/OrganizationController';
import Auth from './app/middlewares/Auth';

const routes = new Router();

routes.post('/user/login', UserController.login);

/** * USER  ** */
routes.post('/user/list/:page', /* Auth.middleware, */ UserController.list);
routes.get('/user/show/:userId', /* Auth.middleware, */ UserController.show);
routes.post('/user/store', /* Auth.middleware, */ UserController.store);
routes.patch('/user/update/:userId', /* Auth.middleware, */ UserController.update);
routes.delete('/user/delete/:userId', /* Auth.middleware, */ UserController.delete);

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

export default routes;

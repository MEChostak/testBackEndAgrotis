import { Router } from 'express';
/*  */
// @ts-ignore
import UserController from './app/controllers/UserController';
// @ts-ignore
import Auth from './app/middlewares/Auth';
// @ts-ignore
const routes = new Router();

/** * USER  ** */
routes.post('/user/list/:page', /* Auth.middleware, */ UserController.list);
routes.get('/user/show/:userId', /* Auth.middleware, */ UserController.show);
routes.post('/user/store', /* Auth.middleware, */ UserController.store);
routes.patch(
  '/user/update/:userId' /* , Auth.middleware */,
  UserController.update
);
routes.delete(
  '/user/delete/:userId',
  /* Auth.middleware, */ UserController.delete
);

/* ** USER LAB ** */
routes.post('/lab/store', /* Auth.middleware, */ UserController.labStore);
routes.delete('/lab/delete/:labId', /* Auth.middleware, */ UserController.labDelete);

/* ** USER INFO ** */
routes.post('/info/store', /* Auth.middleware, */ UserController.infoStore);
routes.delete('/info/delete/:infoId', /* Auth.middleware, */ UserController.infoDelete);


export default routes;

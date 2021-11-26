import { Router } from 'express';
import UserController from './app/controllers/UserController'
const routes = new Router();

/** * USER  ** */
routes.post('/user/list/:page', UserController.list);
routes.post('/user/store', UserController.store);
routes.patch('/user/update/:userId', UserController.update);
routes.get('/user/show/:userId', UserController.show);
routes.delete('/user/delete/:userId', UserController.delete);

export default routes;
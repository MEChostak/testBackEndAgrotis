import 'dotenv/config';

import Youch from 'youch';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import 'express-async-errors';

import routes from './routes';

// Uncomment this line to enable database access
import './database';

const _ = require('lodash');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.service();
  }

  middlewares() {
    this.server.use(fileUpload({ createParentPath: true }));
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(morgan('dev'));
    this.server.use(express.static(`${__dirname}/public`));
  }

  service() {}

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;

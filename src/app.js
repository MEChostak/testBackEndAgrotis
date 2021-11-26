import 'dotenv/config';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import Youch from 'youch';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
const _ = require('lodash');

import 'express-async-errors';

import routes from './routes';

// Uncomment this line to enable database access
// --------
import './database';

class App {
  constructor() {
    this.server = express();

    // Sentry.init({
    //   dsn: "https://c5246b46c60a423b874e75bf97444c0e@o466860.ingest.sentry.io/5559969",
    //   tracesSampleRate: 0.5,
    // });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(fileUpload({createParentPath: true}));
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({extended: true}));
    this.server.use(morgan('dev'));
    this.server.use(express.static(__dirname + '/public'));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(Sentry.Handlers.errorHandler());

    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      } 

      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
      
      //return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;

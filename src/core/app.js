import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import dbConnection from '../modules/index.models.js';
import mountRoutes from '../modules/routes.js';
import { unhandledRoutesHandler } from '../shared/middlewares/unhandled-routes.middleware.js';
import gloabalErrorHandler from './../shared/middlewares/global-error-handler.middleware.js';

const app = express();

dbConnection();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mountRoutes(app);

app.use(unhandledRoutesHandler);
app.use(gloabalErrorHandler);

export default app;

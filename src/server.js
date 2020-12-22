import express from 'express';
import bodyParser from 'body-parser';

import responseTime from 'response-time';

import { initialize } from 'express-openapi';
import 'express-async-errors';

//import https from 'https';
import http from 'http';
import fs from 'fs';

/* API operations */
/* service's operations */
import createServiceOperation from 'operations/service/create';
import fetchServiceOperation from 'operations/service/fetch';
import getServiceOperation from 'operations/service/get';
import updateServiceOperation from 'operations/service/update';
import removeServiceOperation from 'operations/service/remove';

/* reading's operations */
import createReadingOperation from 'operations/reading/create';
import fetchReadingOperation from 'operations/reading/fetch';
import removeReadingOperation from 'operations/reading/remove';

/* user's operations */
import loginUserOperation from 'operations/user/login';
import registerUserOperation from 'operations/user/register';
import getUserOperation from 'operations/user/get';
import updateUserOperation from 'operations/user/update';

/* notification's operations */
import createNotificationOperation from 'operations/notification/create';
import fetchNotificationOperation from 'operations/notification/fetch';
import getNotificationOperation from 'operations/notification/get';
import updateNotificationOperation from 'operations/notification/update';
import removeNotificationOperation from 'operations/notification/remove';

/* errors */
import PasswordsMissmatch from 'errors/PasswordsMissmatch';
import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserDoesNotExist from 'errors/UserDoesNotExist';
import DuplicateUser from 'errors/DuplicateUser';
import UserNotAdmin from 'errors/UserNotAdmin';
import { TokenExpiredError } from 'jsonwebtoken';

/* validations */
import isOpenApiError from 'validations/isOpenApiError';

import * as firebase from 'firebase-admin';
import apiDoc from '../swagger.yml';
import connect from './connect';

const serviceAccount = require('../serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://kis-app.firebaseio.com',
});

const port = process.env.PORT || 3000;

const app = express();
const jsonBodyParser = bodyParser.json({});
/* const urlEncoded = bodyParser.urlencoded({ extended: true }); */

const privateKey = fs.readFileSync(`${__dirname}/ssl/service.key`);
const certificate = fs.readFileSync(`${__dirname}/ssl/service.cert`);

const credentials = { key: privateKey, cert: certificate };

connect();

app.use(jsonBodyParser);
/* app.use(urlEncoded); */
app.use(responseTime(
  (request, response, time) => {
    response.responseTime = time;
  },
));

require('dotenv').config();

initialize({
  app,
  apiDoc,
  errorMiddleware(error, request, response, next) {
    if (isOpenApiError(error)) {
      const fields = {};
      error.errors.forEach((validation) => {
        const { location, path, message } = validation;
        fields[path] = `${location} ${message}`;
      });
      return response.status(400).send({
        error: 'Input is broken...',
        fields,
      });
    }
    if (error instanceof UserNotAuthorized) {
      return response.status(401).send(
        { error: 'Not authorized...' },
      );
    } if (error instanceof DuplicateUser) {
      return response.status(400).send(
        { error: 'Duplicate user...' },
      );
    } if (error instanceof UserNotAdmin) {
      return response.status(400).send(
        { error: 'User is not admin...' },
      );
    } if (error instanceof UserDoesNotExist) {
      return response.status(404).send(
        { error: 'User does not exist...' },
      );
    } if (error instanceof PasswordsMissmatch) {
      return response.status(401).send(
        { error: 'Incorrect password...' },
      );
    } if (error instanceof TokenExpiredError) {
      return response.status(440).send(
        { error: 'Session is expired...' },
      );
    } return next();
  },
  operations: {
    /* service's operations */
    createServiceOperation,
    fetchServiceOperation,
    getServiceOperation,
    updateServiceOperation,
    removeServiceOperation,

    /* reading's operations */
    createReadingOperation,
    fetchReadingOperation,
    removeReadingOperation,

    /* user's operations */
    loginUserOperation,
    registerUserOperation,
    getUserOperation,
    updateUserOperation,

    /* notification's operations */
    createNotificationOperation,
    fetchNotificationOperation,
    getNotificationOperation,
    updateNotificationOperation,
    removeNotificationOperation,
  },
});

app.use((request, response) => {
  response.status(500).send({ error: 'Internal server error...' });
});

app.use((request, response) => {
  response.status(408).send({ error: 'Request timeout...' });
});

app.use((request, response) => {
  response.status(404).send({ error: 'Resource does not exist...' });
});

app.use((request, response) => {
  response.status(400).send({ error: 'Broken input...' });
});

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => console.log(`Server is listening on port ${port}`));
//httpsServer.listen(port, () => console.log(`Server is listening on port ${port}`));
module.exports = app;

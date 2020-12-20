import express from 'express';
import bodyParser from 'body-parser';

import responseTime from 'response-time';

import { initialize } from 'express-openapi';
import 'express-async-errors';

import https from 'https';
/* import http from 'http'; */
import fs from 'fs';

/* API operations */
/* task's operations */
import createTaskOperation from 'operations/task/create';
import fetchTaskOperation from 'operations/task/fetch';
import getTaskOperation from 'operations/task/get';
import updateTaskOperation from 'operations/task/update';
import removeTaskOperation from 'operations/task/remove';

/* lecturer's operations */
import createLecturerOperation from 'operations/lecturer/create';
import fetchLecturerOperation from 'operations/lecturer/fetch';
import removeLecturerOperation from 'operations/lecturer/remove';

/* discipline's operations */
import createDisciplineOperation from 'operations/discipline/create';
import fetchDisciplineOperation from 'operations/discipline/fetch';
import removeDisciplineOperation from 'operations/discipline/remove';

/* discipline-lecturer relationship's operations */
import createDisciplineLecturerOperation from 'operations/disciplineLecturer/create';
import fetchDisciplineLecturerOperation from 'operations/disciplineLecturer/fetch';
import removeDisciplineLecturerOperation from 'operations/disciplineLecturer/remove';

/* student's operations */
import loginStudentOperation from 'operations/student/login';
import registerStudentOperation from 'operations/student/register';
import profileStudentOperation from 'operations/student/profile';

/* file upload feature operations */
import uploadFileOperation from 'operations/file/upload';
import fetchFileOperation from 'operations/file/fetch';

/* errors */
import PasswordsMissmatch from 'errors/PasswordsMissmatch';
import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserDoesNotExist from 'errors/UserDoesNotExist';
import DuplicateUser from 'errors/DuplicateUser';
import UserNotAdmin from 'errors/UserNotAdmin';
import { TokenExpiredError } from 'jsonwebtoken';

/* validations */
import isOpenApiError from 'validations/isOpenApiError';

import apiDoc from '../swagger.yml';
import connect from './connect';

const port = process.env.PORT || 3000;

const app = express();
const jsonBodyParser = bodyParser.json({});
/* const urlEncoded = bodyParser.urlencoded({ extended: true }); */

const privateKey = fs.readFileSync(`${__dirname}/ssl/service-task.key`);
const certificate = fs.readFileSync(`${__dirname}/ssl/service-task.cert`);

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
        error: 'Your input maybe is broken. Check the output bellow:',
        fields,
      });
    }
    if (error instanceof UserNotAuthorized) {
      return response.status(401).send(
        { error: 'Get your dirty hands off our application, hacker!' },
      );
    } if (error instanceof DuplicateUser) {
      return response.status(400).send(
        { error: 'We already know you!' },
      );
    } if (error instanceof UserNotAdmin) {
      return response.status(400).send(
        { error: 'Seem like you do not have administrative rights to perform this task!' },
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
    /* task's operations */
    createTaskOperation,
    fetchTaskOperation,
    getTaskOperation,
    updateTaskOperation,
    removeTaskOperation,
    /* lecturer's operations */
    createLecturerOperation,
    fetchLecturerOperation,
    removeLecturerOperation,
    /* discipline's operations */
    createDisciplineOperation,
    fetchDisciplineOperation,
    removeDisciplineOperation,
    /* discipline-lecturer relationship's operations */
    createDisciplineLecturerOperation,
    fetchDisciplineLecturerOperation,
    removeDisciplineLecturerOperation,
    /* student's operations */
    loginStudentOperation,
    registerStudentOperation,
    profileStudentOperation,
    /* file upload feature operations */
    uploadFileOperation,
    fetchFileOperation,
  },
});

app.use((request, response) => {
  response.status(500).send({ error: 'We are having crisis, it\'s not your fault...' });
});

app.use((request, response) => {
  response.status(408).send({ error: 'The request timeouted...' });
});

app.use((request, response) => {
  response.status(404).send({ error: 'Requested resource does not exist...' });
});

app.use((request, response) => {
  response.status(400).send({ error: 'Something is wrong, check your data before sending us a love letter.' });
});

/* const httpServer = http.createServer(app); */
const httpsServer = https.createServer(credentials, app);

/* httpServer.listen(8080, () => console.log('Server is listening on port 8080')); */
httpsServer.listen(port, () => console.log(`Server is listening on port ${port}`));
module.exports = app;

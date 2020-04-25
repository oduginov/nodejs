const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const bodyParser = require('body-parser');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const usersService = require('./resources/users/user.service');

const { logInfo, logger } = require('./common/logging');
const { errorHandler } = require('./common/error-handling');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', error => {
  logger.log('error', `captured error: ${error.message}`);
  setTimeout(() => {
    const { exit } = process;
    exit(1);
  }, 1000);
});

process.on('unhandledRejection', reason => {
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
  setTimeout(() => {
    const { exit } = process;
    exit(1);
  }, 1000);
});

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

app.use('/login', loginRouter);
app.use('/users', [usersService.checkToken, userRouter]);
app.use('/boards', [usersService.checkToken, boardRouter, taskRouter]);
app.use(errorHandler);
app.use(logInfo);
module.exports = app;

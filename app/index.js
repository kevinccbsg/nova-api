const express = require('express');
const bodyParser = require('body-parser');
const { handleHttpError } = require('error-handler-module');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const mongodb = require('./mongodb');
const config = require('./config');
const members = require('./controller/members');
const docsValidator = require('./docsValidator');
const membersAPI = require('./routes/members');
const logger = require('../utils/logger');

const app = express();

const startServer = async () => {
  const validators = await docsValidator({ app, config: config.swagger });
  const { dbInstance, store, models } = await mongodb(config.mongo);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(compression());
  app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }));
  app.use('/api/v1', membersAPI({
    controller: members({ store, logger, config: config.controller }),
    validators,
  }));

  app.use(handleHttpError(logger));

  return {
    app,
    dbInstance,
    testingHelper: process.env.NODE_ENV === 'test' ? {
      mongo: models,
    } : {},
  };
};

module.exports = startServer;

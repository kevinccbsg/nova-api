const express = require('express');
const bodyParser = require('body-parser');
const { handleHttpError } = require('error-handler-module');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const mongodb = require('./mongodb');
const config = require('./config');
const members = require('./controller/members');
const api = require('./routes/api');
const logger = require('../utils/logger');

const app = express();

const startServer = async () => {
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
  app.use('/api/v1', api({
    controller: members({ store, logger, config: config.controller }),
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

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const api = require('./routes/api');

const app = express();

const startServer = () => new Promise((resolve) => {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(compression());
  app.use(morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' }));
  app.use('/api/v1', api());

  resolve({ app });
});

module.exports = startServer;

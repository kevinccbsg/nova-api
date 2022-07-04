const express = require('express');
const nominations = require('./nominations');
const members = require('./members');

const router = express.Router();

const initNominations = ({ controller, validators }) => {
  router.use('/members', members({ controller, validators }));
  router.use('/nominations', nominations({ controller, validators }));

  return router;
};

module.exports = initNominations;

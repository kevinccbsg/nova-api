const express = require('express');
const { tagError } = require('error-handler-module');
const { dbErrorTypes } = require('../constants/errorCodes');

const router = express.Router();

const initNominations = ({ controller, validators }) => {
  const { validateResponse } = validators;
  /**
   * GET /api/v1/nominations
   * @summary Nomination list
   * @return {Array<Nomination>} 200 - Nomination response
   * @return 500 - Internal server error
   */
  router.get('/', async (req, res, next) => {
    try {
      const nominations = await controller.nominations();
      validateResponse(nominations, req, 201);
      return res.status(200).json(nominations);
    } catch (error) {
      return next(tagError(error, dbErrorTypes));
    }
  });

  return router;
};

module.exports = initNominations;

const express = require('express');
const { tagError } = require('error-handler-module');
const limiter = require('../../utils/limiter');
const { dbErrorTypes } = require('../constants/errorCodes');

const router = express.Router();

const initNominations = ({ controller, validators }) => {
  const { validateResponse } = validators;
  /**
   * GET /api/v1/nominations/
   * @summary Nomination list
   * @return {NominationListResponse} 200 - Nomination response
   * @return 500 - Internal server error
   */
  router.get('/', limiter, async (req, res, next) => {
    try {
      const nominations = await controller.getNominations();
      const response = {
        data: nominations,
      };
      validateResponse(response, req);
      return res.status(200).json(response);
    } catch (error) {
      return next(tagError(error, dbErrorTypes));
    }
  });

  return router;
};

module.exports = initNominations;

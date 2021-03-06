const express = require('express');
const { tagError } = require('error-handler-module');
const limiter = require('../../utils/limiter');
const { dbErrorTypes } = require('../constants/errorCodes');

const router = express.Router();

const initMembers = ({ controller, validators }) => {
  const { validateRequest, validateResponse } = validators;
  /**
   * POST /api/v1/members/{memberId}/nominations
   * @summary Register a new nomination
   * @param {string} memberId.path - Trip id
   * @param {NominationRequest} request.body.required -Nomination payload
   * @return {NominationResponse} 201 - Nomination response
   * @return 409 - Already a nomination
   * @return 500 - Internal server error
   */
  router.post('/:memberId/nominations', validateRequest(), limiter, async (req, res, next) => {
    try {
      const newMember = await controller.nominateNewMember(req.params.memberId, req.body);
      validateResponse(newMember, req, 201);
      return res.status(201).json(newMember);
    } catch (error) {
      return next(tagError(error, dbErrorTypes));
    }
  });

  return router;
};

module.exports = initMembers;

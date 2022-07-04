const express = require('express');
const { tagError } = require('error-handler-module');

const router = express.Router();

const initRouter = ({ controller }) => {
  router.post('/members/:memberId/nominations', async (req, res, next) => {
    try {
      const newMember = await controller.nominateNewMember(req.body);
      return res.status(201).json(newMember);
    } catch (error) {
      const dbErrorTypes = {
        'db-conflict-error': 409,
        'db-error': 500,
      };
      return next(tagError(error, dbErrorTypes));
    }
  });

  return router;
};

module.exports = initRouter;

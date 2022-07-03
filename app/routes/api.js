const express = require('express');
const { tagError } = require('error-handler-module');

const router = express.Router();

const initRouter = ({ controller }) => {
  router.post('/members/:memberId/nominations', async (req, res, next) => {
    try {
      const newMember = await controller.nominateNewMember(req.body);
      return res.status(201).json(newMember);
    } catch (error) {
      return next(tagError(error));
    }
  });

  return router;
};

module.exports = initRouter;

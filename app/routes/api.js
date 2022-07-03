const express = require('express');

const router = express.Router();

const initRouter = () => {
  router.post('/members/:memberId/nominations', async (_req, res) => res.sendStatus(200));

  return router;
};

module.exports = initRouter;

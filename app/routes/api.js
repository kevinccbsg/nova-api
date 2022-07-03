const express = require('express');

const router = express.Router();

const initRouter = ({ controller }) => {
  router.post('/members/:memberId/nominations', async (req, res) => {
    const newMember = await controller.nominateNewMember(req.body);
    return res.status(201).json(newMember);
  });

  return router;
};

module.exports = initRouter;

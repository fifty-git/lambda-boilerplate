'use strict';

const asyncHandler = require('express-async-handler');
const {
  getTagService,
  insertTagService,
  updateTagService,
} = require('../services/demoService');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const result = await getTagService(req.params.id);
    if (result.error) {
      res.status(400).json(result.error);
    }
    res.status(200).json(result);
  }),

  post: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await insertTagService(body);
    if (result.error) {
      res.status(400).json(result.error);
    }
    res.status(200).json(result);
  }),

  put: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await updateTagService(body);
    if (result.error) {
      res.status(400).json(result.error);
    }
    res.status(200).json(result);
  }),
};

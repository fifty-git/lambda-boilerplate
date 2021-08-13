'use strict';

const AWS = require('aws-sdk');
const asyncHandler = require('express-async-handler');

module.exports = {
  get: asyncHandler(async (req, res) => {
    if (!req.params) {
      res
        .status(400)
        .json({ error: true, message: 'there was an error' });
    }
    res.status(200).json({
      error: false,
      message: 'Success',
      params: req.params,
    });
  }),
  post: asyncHandler(async (req, res) => {
    const { body } = req;
    if (body.length > 0) {
      res
        .status(400)
        .json({ error: true, message: 'there was an error' });
    }
    res.status(200).json({ error: false, message: 'Success', body });
  }),
};

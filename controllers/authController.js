'use strict';

const asyncHandler = require('express-async-handler');

/**
 * this is for running test
 * serverless-offline loads the env vars globally
 * when running mocha the env vars are missing without
 * the following module loaded.
 */
if (typeof process.env.JWT_KEY === 'undefined') {
  // eslint-disable-next-line global-require
  require('dotenv-flow').config();
}

const authController = jwt => {
  const getToken = () => {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        name: 'batchsmsjwt',
      },
      process.env.JWT_KEY,
      { algorithm: 'HS256' },
    );
    return token;
  };

  // eslint-disable-next-line no-unused-vars
  const get = asyncHandler(async (req, res, next) => {
    const token = await getToken();
    if (token) {
      console.log('TOKEN', token);
      res.json({ jwt: token });
    } else {
      res.status(500).json({
        error: true,
        message: 'JWT token not generated',
      });
    }
  });
  return { get, getToken };
};

module.exports = authController;

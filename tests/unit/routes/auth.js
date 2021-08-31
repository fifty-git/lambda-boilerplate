'use strict';

require('mocha');
const { assert } = require('chai');
const authRouter = require('../../../routes/auth');

// eslint-disable-next-line no-use-before-define, global-require
const expressRouterType = typeof require('express').Router();

describe('authRoute', () => {
  const router = authRouter();
  it('Should be an express router', () => {
    assert.typeOf(router, expressRouterType, 'should be the same type');
  });
});

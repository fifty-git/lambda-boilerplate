'use strict';

require('mocha');
const { assert } = require('chai');
const jwt = require('jsonwebtoken');
const authController = require('../../../controllers/authController')(jwt);

// eslint-disable-next-line no-use-before-define, global-require
const typeAsyncHandler = typeof require('express-async-handler');

describe('authController', () => {
  describe('#getToken', () => {
    it('should be a function', () => assert.isFunction(authController.getToken));
    it('should return a token', () => assert.typeOf(authController.getToken(), 'string'));
  });

  describe('#get', () => {
    const responseMock = {
      json(obj) {
        responseMock.token = obj.jwt;
        responseMock.stat = 200;
      },
      stat: {},
      status(stat) {
        responseMock.stat = stat;
        return { json: () => {} };
      },
      token: ''
    };

    it('should be an async handler', () => assert.typeOf(authController.get, typeAsyncHandler));
    it('should not throw an error', () => assert.doesNotThrow(authController.get, Error));
    it('should return a token', async () => {
      await authController.get({}, responseMock);
      assert.deepEqual(responseMock.stat, 200, 'should return a 200 status');
      assert.deepEqual(responseMock.token, authController.getToken(), 'should be the same token');
    });
  });
});

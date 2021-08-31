'use strict';

require('mocha');
const { assert } = require('chai');
const proxyquire = require('proxyquire');

// eslint-disable-next-line no-use-before-define, global-require
const expressRouterType = require('express').Router;

describe('demoRoute', () => {
  const demoControllerMock = {
    get() {},
    post() {},
    put() {}
  };
  const demoRouter = proxyquire('../../../routes/demoroute', {
    './../controllers/demoController': demoControllerMock
  });
  it('should return an express router', () => {
    assert.typeOf(demoRouter, typeof expressRouterType, 'should be the same');
  });
});

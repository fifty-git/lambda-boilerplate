'use strict';

require('mocha');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const { assert } = require('chai');

describe('demoController', () => {
  let requestMock = null;
  let responseMock = null;
  const serviceMock = {
    getTagService: sinon.stub(),
    insertTagService: sinon.stub(),
    updateTagService: sinon.stub()
  };
  const demoController = proxyquire('../../../controllers/demoController', {
    '../services/demoService': serviceMock
  });

  serviceMock.getTagService.onCall(0).returns({ error: false });
  serviceMock.getTagService.onCall(1).returns({ error: true });
  serviceMock.insertTagService.onCall(0).returns({ error: false });
  serviceMock.insertTagService.onCall(1).returns({ error: true });
  serviceMock.updateTagService.onCall(0).returns({ error: false });
  serviceMock.updateTagService.onCall(1).returns({ error: true });

  beforeEach(() => {
    requestMock = {
      params: { id: 1 },
      body: {}
    };
    responseMock = {
      stat: {},
      status(stat) {
        if (responseMock.stat !== 400) {
          responseMock.stat = stat;
        }
        return { json: () => {} };
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#get', async () => {
    it('getTagService should be called', async () => {
      await demoController.get(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 200, 'Response should be 200');
      await demoController.get(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 400, 'Response should be 400');
    });
  });

  describe('#post', async () => {
    it('insertTagService should be called', async () => {
      await demoController.post(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 200, 'Response should be 200');
      await demoController.post(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 400, 'Response should be 200');
    });
  });

  describe('#put', async () => {
    it('updateTagService should be called', async () => {
      await demoController.put(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 200, 'Response should be 200');
      await demoController.put(requestMock, responseMock);
      assert.deepEqual(responseMock.stat, 400, 'Response should be 200');
    });
  });
});

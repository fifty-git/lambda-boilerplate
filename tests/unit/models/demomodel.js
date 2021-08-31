'use strict';

require('mocha');
const { assert } = require('chai');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

describe('demoModel', () => {
  let demoModel = null;
  let mysqlMock = null;

  beforeEach(() => {
    mysqlMock = {
      query: sinon.stub(),
      end: sinon.stub(),
    };
    demoModel = proxyquire('../../../models/demoModels', {
      './index': mysqlMock
    });
    mysqlMock.query.onCall(0).returns({
      catch() {
        return { insertId: 1 };
      }
    });
    mysqlMock.query.onCall(1).throws('[fake-mysql] Error');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#getTag', () => {
    it('should return an object', async () => {
      let result = await demoModel.getTag(1);
      assert.deepEqual(result.error, false, 'there should not be an error');
      try {
        result = await demoModel.getTag(1);
      } catch (error) {
        result.error = true;
        assert.deepEqual(result.error, true, 'there should be an error');
      }
    });
  });

  describe('#insertTag', () => {
    const data = {
      tagname: '',
      tagdescription: '',
      tagpriority: '',
      tagcolor: ''
    };
    it('should return an object', async () => {
      let result = await demoModel.insertTag(data);
      assert.deepEqual(result.error, false, 'there should not be an error');
      try {
        result = await demoModel.insertTag(data);
      } catch (error) {
        result.error = true;
      }
      assert.deepEqual(result.error, true, 'there should be an error');
    });
  });

  describe('#updateTag', () => {
    it('should return an object', async () => {
      let result = await demoModel.updateTag(1);
      assert.deepEqual(result.error, false, 'there should not be an error');
      result = await demoModel.updateTag(1);
      assert.deepEqual(result.error, true, 'there should be an error');
    });
  });
});

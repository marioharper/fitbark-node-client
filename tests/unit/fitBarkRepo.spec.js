/* eslint-disable global-require */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const Promise = require('bluebird');
const mockery = require('mockery');

const expect = chai.expect;

describe('using FitBarkRepo', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
  });

  afterEach(() => {
    sandbox.restore();
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('and calling getDogRelations', () => {
    it('it should use options', () => {
      const rpMock = sandbox.stub().returns(Promise.resolve());
      mockery.registerMock('request-promise', rpMock);

      const FitBarkRepo = require('../../src/fitBarkRepo');
      const fitBarkRepo = new FitBarkRepo('fake');

      const expectedRequestOptions = {
        uri: 'https://app.fitbark.com/api/v2/dog_relations',
        headers: {
          authorization: 'Bearer fake',
        },
        json: true,
      };

      return fitBarkRepo.getDogRelations().then(() => {
        expect(rpMock.calledWith(expectedRequestOptions)).to.equal(true);
      });
    });
  });

  describe('and calling getActivitySeries', () => {
    it('it should use options', () => {
      const options = {
        slug: 'fake-slug',
        from: '2016-02-19',
        to: '2016-02-20',
        resolution: 'DAILY',
      };

      const rpMock = sandbox.stub().returns(Promise.resolve());
      mockery.registerMock('request-promise', rpMock);

      const FitBarkRepo = require('../../src/fitBarkRepo');
      const fitBarkRepo = new FitBarkRepo('fake');

      const expectedRequestOptions = {
        method: 'POST',
        uri: 'https://app.fitbark.com/api/v2/activity_series',
        headers: {
          authorization: 'Bearer fake',
          'content-type': 'application/json',
        },
        json: true,
        body: {
          activity_series: options,
        },
      };

      return fitBarkRepo.getActivitySeries(options).then(() => {
        expect(rpMock.calledWith(expectedRequestOptions)).to.equal(true);
      });
    });
  });
});

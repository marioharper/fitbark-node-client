const chai = require('chai');
const sinon = require('sinon');
const Promise = require('bluebird');
const mockery = require('mockery');

const expect = chai.expect;
/* eslint-disable global-require */
/* eslint-disable no-undef */

/* global describe */
describe('using FitBark', () => {
  const sandbox = sinon.sandbox.create();

  before(() => {
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
  });

  after(() => {
    mockery.disable();
  });

  beforeEach(() => {
    mockery.deregisterAll();
    sandbox.restore();
  });

  afterEach(() => {
    mockery.deregisterAll();
    mockery.resetCache();
  });

  describe('and calling getDog', () => {
    it('it should call getDogRelations', () => {
      const getDogRelationsStub = sandbox.stub().returns(Promise.resolve({
        dog_relations: [],
      }));

      const fitBarkRepo = function fitBarkRepo() {
        return {
          getDogRelations: getDogRelationsStub,
        };
      };

      mockery.registerMock('./fitBarkRepo', fitBarkRepo);

      const FitBark = require('../../src/fitBark');
      const fitBark = new FitBark('fake');

      return fitBark.getDog('julio').then(() => {
        expect(getDogRelationsStub.called).to.equal(true);
      });
    });

    it('should return null', () => {
      expect(true).to.equal(true);
    });
    describe('and no dogs', () => {
      it('it should return null', () => {
        const getDogRelationsStub = sandbox.stub().returns(Promise.resolve({
          dog_relations: [],
        }));

        const fitBarkRepo = function fitBarkRepo() {
          return {
            getDogRelations: getDogRelationsStub,
          };
        };

        mockery.registerMock('./fitBarkRepo', fitBarkRepo);

        const FitBark = require('../../src/fitBark');
        const fitBark = new FitBark('fake');

        return fitBark.getDog('julio').then(dog => expect(dog).to.equal(undefined));
      });
    });

    describe('and dog', () => {
      it('it should return the dog', () => {
        const fakeGetDogRelationsReturn = require('./fake-data/getDogRelations');

        const getDogRelationsStub = sandbox.stub()
          .returns(Promise.resolve(fakeGetDogRelationsReturn));

        const fitBarkRepo = function fitBarkRepo() {
          return {
            getDogRelations: getDogRelationsStub,
          };
        };

        mockery.registerMock('./fitBarkRepo', fitBarkRepo);

        const FitBark = require('../../src/fitBark');
        const fitBark = new FitBark('fake-token');

        return fitBark.getDog('Barley').then(dog => expect(dog).to.not.equal(null));
      });
    });
  });
});

/* eslint-disable global-require */
/* eslint-disable no-undef */
const chai = require('chai');
const sinon = require('sinon');
const Promise = require('bluebird');
const mockery = require('mockery');

const expect = chai.expect;

describe('using FitBark', () => {
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

        return fitBark.getDog('Barley').then(dog => expect(dog).to.not.equal(undefined));
      });
    });
  });

  describe('and calling getActivitySeries', () => {
    it('it should call repo getActivitySeries', () => {
      const getActivitySeriesStub = sandbox.stub().returns(Promise.resolve());

      const fitBarkRepo = function fitBarkRepo() {
        return {
          getActivitySeries: getActivitySeriesStub,
        };
      };

      mockery.registerMock('./fitBarkRepo', fitBarkRepo);

      const FitBark = require('../../src/fitBark');
      const fitBark = new FitBark('fake');

      const slug = 'test-slug';
      const from = '2015-09-09';
      const to = '2015-09-10';
      const resolution = 'DAILY';

      return fitBark.getActivitySeries(slug, from, to, resolution).then(() => {
        expect(getActivitySeriesStub.calledWith({ slug, from, to, resolution })).to.equal(true);
      });
    });
  });
});

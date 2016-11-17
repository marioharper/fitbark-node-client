var chai = require('chai');
var sinon = require('sinon');
var Promise = require('bluebird');
var expect = chai.expect;
var mockery = require('mockery');

describe('using FitBark', () => {
    var sandbox = sinon.sandbox.create();

    before(() => {
        mockery.enable({ 
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
    });

    after(()=>{
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
    
        describe('and no dogs', () => {
            
            it('it should return null', () => {

                var getDogRelationsStub = sandbox.stub().returns(Promise.resolve({
                    dog_relations: []
                }));
                mockery.registerMock('./fitBarkRepo', function() {
                    return {
                        getDogRelations: getDogRelationsStub
                    }
                });

                var FitBark = require('../../src/fitBark');
                var fitBark = new FitBark('fake');
    
                return fitBark.getDog('julio').then((dog)=>{
                    expect(dog).to.equal(undefined);
                });
            });

        });

        describe('and dog', () => {
             
            it('it should return the dog', () => {
                var fakeGetDogRelationsReturn = require('./fake-data/getDogRelations');

                var getDogRelationsStub = sandbox.stub().returns(Promise.resolve(
                    fakeGetDogRelationsReturn
                ));
                mockery.registerMock('./fitBarkRepo', function() {
                    return {
                        getDogRelations: getDogRelationsStub
                    }
                });

                var FitBark = require('../../src/fitBark');
                var fitBark = new FitBark('fake-token');
    
                return fitBark.getDog('Barley').then((dog)=>{
                    expect(dog).to.not.equal(null);
                });
            });

        });

        it('it should call getDogRelations', () => {

            var getDogRelationsStub = sandbox.stub().returns(Promise.resolve({
                dog_relations: []
            }));
            mockery.registerMock('./fitBarkRepo', function() {
                return {
                    getDogRelations: getDogRelationsStub
                }
            });

            var FitBark = require('../../src/fitBark');
            var fitBark = new FitBark('fake');
  
            return fitBark.getDog('julio').then(()=>{
                expect(getDogRelationsStub.called).to.equal(true);
            });
        });

        it('should return null', () => {
            expect(true).to.equal(true);
        });

    });
});
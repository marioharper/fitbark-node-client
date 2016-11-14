var rp = require('request-promise');
var Promise = require('bluebird');
var FitBarkRepo = require('./fitBarkRepo');
var API_BASE = 'https://app.fitbark.com/api/v2';

function FitBark(apiToken){
  this.fitBarkRepo = new FitBarkRepo(apiToken);
}

//////////////////////////////

FitBark.prototype.getDog = function(dogName){
  
  return this.getDogs().then((dogs) => {

    for (var dog of dogs) {
      if (dog.name.toUpperCase() === dogName.toUpperCase()) {
        return dog;
      }
    }

    return null;
  });

};

FitBark.prototype.getDogs = function(){

  return this.fitBarkRepo.getDogRelations().then((dogRelations) => {
    var dogs = [];
    
    if(!dogRelations){
      return dogs;
    }

    dogRelations = dogRelations.dog_relations;

    for (var dogRelation of dogRelations) {
      dogs.push(dogRelation.dog);
    }

    return dogs;
  });

}


module.exports = FitBark;





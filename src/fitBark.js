const FitBarkRepo = require('./fitBarkRepo');

function FitBark(apiToken) {
  this.fitBarkRepo = new FitBarkRepo(apiToken);
}

FitBark.prototype.getDog = function getDog(dogName) {
  return this.getDogs().then((dogs) => {
    return dogs.find((dog) => {
      return (dog.name.toUpperCase() === dogName.toUpperCase());
    });
  });
};

FitBark.prototype.getDogs = function getDogs() {
  return this.fitBarkRepo.getDogRelations().then((dogRelations) => {
    const dogs = [];

    if (!dogRelations) {
      return dogs;
    }

    dogRelations.dog_relations.forEach((dogRelation) => {
      dogs.push(dogRelation.dog);
    });

    return dogs;
  });
};

module.exports = FitBark;

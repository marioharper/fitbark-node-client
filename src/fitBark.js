const FitBarkRepo = require('./fitBarkRepo');

module.exports = class FitBark {
  constructor(apiToken) {
    this.fitBarkRepo = new FitBarkRepo(apiToken);
  }

  getDog(dogName) {
    return this.getDogs().then((dogs) => {
      dogs.find(dog => (dog.name.toUpperCase() === dogName.toUpperCase()));
    });
  }

  getDogs() {
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
  }
};

const rp = require('request-promise');

const API_BASE = 'https://app.fitbark.com/api/v2';

function FitBarkRepo(apiToken) {
  this.API_TOKEN = apiToken;
}

FitBarkRepo.prototype.getDogRelations = function getDogRelations() {
  const options = {
    uri: `${API_BASE}/dog_relations`,
    headers: {
      authorization: `Bearer ${this.API_TOKEN}`,
    },
    json: true,
  };

  return rp(options);
};

module.exports = FitBarkRepo;

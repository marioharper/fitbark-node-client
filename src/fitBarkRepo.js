var rp = require('request-promise');
var API_BASE = 'https://app.fitbark.com/api/v2';

function FitBarkRepo(apiToken){
  this.API_TOKEN = apiToken;
}

////////////////////////////

FitBarkRepo.prototype.getDogRelations = function(){
    
  var options = {
    uri: API_BASE + '/dog_relations',
    headers: {
      'authorization': 'Bearer ' + this.API_TOKEN
    },
    json: true
  };

  return rp(options);
};

module.exports = FitBarkRepo;
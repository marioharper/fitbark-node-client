const rp = require('request-promise');

const API_BASE = 'https://app.fitbark.com/api/v2';

module.exports = class FitBarkRepo {
  constructor(apiToken) {
    this.API_TOKEN = apiToken;
  }

  getDogRelations() {
    const options = {
      uri: `${API_BASE}/dog_relations`,
      headers: {
        authorization: `Bearer ${this.API_TOKEN}`,
      },
      json: true,
    };

    return rp(options);
  }

  getActivitySeries({ slug, from, to, resolution }) {
    const options = {
      method: 'POST',
      uri: `${API_BASE}/activity_series`,
      headers: {
        authorization: `Bearer ${this.API_TOKEN}`,
        'content-type': 'application/json',
      },
      json: true,
      body: {
        activity_series: {
          slug,
          from,
          to,
          resolution,
        },
      },
    };

    return rp(options);
  }
};

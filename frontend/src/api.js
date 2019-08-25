const BASE_URL = 'http://localhost:3010';

async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  stations: {
    list() {
      return callApi('/badges');
    },
    create(station) {
      return callApi(`/badges`, {
        method: 'POST',
        body: JSON.stringify(station),
      });
    },
    read(stationId) {
      return callApi(`/stations/${stationId}`);
    },
    update(stationId, updates) {
      return callApi(`/badges/${stationId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    remove(stationId) {
      return callApi(`/badges/${stationId}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;

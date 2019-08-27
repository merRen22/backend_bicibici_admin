const BASE_URL = 'http://localhost:3010';

async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  console.log(data);

  return data;
}

const api = {
  stations: {
    list() {
      return callApi('/stations/list');
    },
    create(station) {
      return callApi(`/badges`, {
        method: 'POST',
        body: JSON.stringify(station),
      });
    },
    read(stationId) {
      return {
        "Address": "Station2",
        "createdAt": "2019-08-22T17:51:48.729Z",
        "Latitude": 12121,
        "Longitude": 1212,
        "StationID": 2,
        "TotalSlots": 121
      }
      //callApi(`/stations/${stationId}`);
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

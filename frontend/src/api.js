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
      return callApi(`/stations/create`, {
        method: 'POST',
        body: JSON.stringify(station),
      });
    },
    read(Address) {
      callApi(`/stations/${Address}`);
    },
    update(Address, updates) {
      return callApi(`/badges/${Address}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    remove(Address) {
      return callApi(`/stations/delete`, {
        method: 'POST',
        body: JSON.stringify(Address),
      });
    },
  },
};

export default api;

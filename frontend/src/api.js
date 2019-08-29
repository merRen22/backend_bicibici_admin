const BASE_URL = 'http://localhost:3010';

async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

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
      return callApi(`/stations/list/uuid`,{
        method:'POST',
        body: JSON.stringify(Address)
      });
    },
    update(station) {
      return callApi(`/stations/update`, {
        method: 'POST',
        body: JSON.stringify(station),
      });
    },
    remove(Address) {
      return callApi(`/stations/delete/uuid`, {
        method: 'POST',
        body: JSON.stringify(Address),
      });
    },
  },
};

export default api;

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
    listByAddress(address) {
      return callApi('/stations/list/address', {
        method: 'POST',
        body: JSON.stringify(address),
      });
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
  bike: {
    list() {
      return callApi('/bikes/list');
    },
    create() {
      return callApi(`/bikes/create`, {
        method: 'POST',
        body: JSON.stringify(),
      });
    },
    read(Address) {
      return callApi(`/bikes/list/uuid`,{
        method:'POST',
        body: JSON.stringify(Address)
      });
    },
    update(station) {
      return callApi(`/bikes/update`, {
        method: 'POST',
        body: JSON.stringify(station),
      });
    },
    remove(Address) {
      return callApi(`/bikes/delete`, {
        method: 'POST',
        body: JSON.stringify(Address),
      });
    },
  },
  plans: {
    list() {
      return callApi('/plans/list');
    },
    listByName(name) {
      return callApi('/plans/list/name', {
        method: 'POST',
        body: JSON.stringify(name),
      });
    },
    create(plan) {
      return callApi(`/plans/create`, {
        method: 'POST',
        body: JSON.stringify(plan),
      });
    },
    read(uuid) {
      return callApi(`/plans/get`,{
        method:'POST',
        body: JSON.stringify(uuid)
      });
    },
    update(plan) {
      return callApi(`/plans/update`, {
        method: 'POST',
        body: JSON.stringify(plan),
      });
    },
    remove(uuid) {
      return callApi(`/plans/delete`, {
        method: 'POST',
        body: JSON.stringify(uuid),
      });
    },
  },
  accounts: {
    list() {
      return callApi('/accounts/list');
    },
    listByMail(name) {
      return callApi('/accounts/list/mail', {
        method: 'POST',
        body: JSON.stringify(name),
      });
    },
    create(plan) {
      return callApi(`/accounts/create`, {
        method: 'POST',
        body: JSON.stringify(plan),
      });
    },
    read(uuid) {
      return callApi(`/accounts/get`,{
        method:'POST',
        body: JSON.stringify(uuid)
      });
    },
    update(plan) {
      return callApi(`/accounts/update`, {
        method: 'POST',
        body: JSON.stringify(plan),
      });
    },
    remove(uuid) {
      return callApi(`/accounts/delete`, {
        method: 'POST',
        body: JSON.stringify(uuid),
      });
    },
    login(formLogin) {
      return callApi(`/accounts/login`, {
        method: 'POST',
        body: JSON.stringify(formLogin),
      });
    },
  },
  map: {
    mapElements() {
      return callApi('/dashboard/map');
    },
  },
  report: {
    reportElements(){
      return callApi('/dashboard/report')
    },
    closeReport(uuid){
      return callApi('/report/close', {
        method: 'POST',
        body: JSON.stringify(uuid),
      });
    }
  }
};

export default api;

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
      return {
        "pages":6,
        "stations": [{
          "Address": "Station1",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 1,
          "TotalSlots": 121
        },
        {

          "Address": "Station2",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 2,
          "TotalSlots": 121
        },
        {
          "Address": "Station3",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 3,
          "TotalSlots": 121
        },
        {
          "Address": "Station4",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 4,
          "TotalSlots": 121
        },

        {
          "Address": "Station5",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 5,
          "TotalSlots": 121
        },

        {
          "Address": "Station6",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 6,
          "TotalSlots": 121
        },
        {
          "Address": "Station7",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 7,
          "TotalSlots": 121
        },
        {
          "Address": "Station8",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 8,
          "TotalSlots": 121
        },
        {
          "Address": "Station9",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 9,
          "TotalSlots": 121
        },
        {
          "Address": "Station10",
          "createdAt": "2019-08-22T17:51:48.729Z",
          "Latitude": 12121,
          "Longitude": 1212,
          "StationID": 10,
          "TotalSlots": 121
        }
        ]
      };
      //return callApi('/badges');
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

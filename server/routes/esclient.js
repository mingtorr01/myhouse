const elasticsearch = require("elasticsearch");

var trade_esclient = new elasticsearch.Client({
  cloud: {
    id: "name : 111b08c44f374be09258afed962ac848",
  },
  auth: {
    username: "elastic",
    password: "ARpUCTd6slJOq22Se7izPVnL",
  },
});
function code1(location) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: location.index,
        body: {
          sort: [{ date: "asc" }],
          size: 10000,
          query: {
            bool: {
              must: [
                {
                  match_all: {},
                },
              ],
              filter: [
                {
                  geo_distance: {
                    distance: "1m",
                    location: {
                      lat: location.lat,
                      lon: location.lon,
                    },
                  },
                },
              ],
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
}

function deposit(location) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: location.index,
        body: {
          sort: [{ date: "asc" }],
          size: 10000,
          query: {
            bool: {
              must: [
                {
                  match_all: {},
                },
              ],
              filter: [
                {
                  geo_distance: {
                    distance: "1m",
                    location: {
                      lat: location.lat,
                      lon: location.lon,
                    },
                  },
                },
                {
                  range: {
                    rental_fee: { lte: 0 },
                  },
                },
              ],
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
}

function rent(location) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: location.index,
        body: {
          sort: [{ date: "asc" }],
          size: 10000,
          query: {
            bool: {
              must: [
                {
                  match_all: {},
                },
              ],
              filter: [
                {
                  geo_distance: {
                    distance: "1m",
                    location: {
                      lat: location.lat,
                      lon: location.lon,
                    },
                  },
                },
                {
                  range: {
                    rental_fee: { gt: 0 },
                  },
                },
              ],
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
}

function schools(location) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: "schools",
        size: 3,
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    stage: location.stage,
                  },
                },
              ],
              filter: [
                {
                  geo_distance: {
                    distance: "10km",
                    location: {
                      lat: location.lat,
                      lon: location.lon,
                    },
                  },
                },
              ],
            },
          },
          sort: [
            {
              _geo_distance: {
                location: {
                  lat: location.lat,
                  lon: location.lon,
                },
                order: "asc",
                unit: "km",
                mode: "min",
                distance_type: "arc",
                ignore_unmapped: true,
              },
            },
          ],
        },
      })
      .then(
        function (resp) {
          resolve(resp);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
}

module.exports = {
  code1,
  rent,
  deposit,
  schools,
};

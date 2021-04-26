const elasticsearch = require("elasticsearch");

var trade_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
});
var deposit_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
});
var rent_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
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

module.exports = {
  code1,
  rent,
  deposit,
};

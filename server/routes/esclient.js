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
    console.log("====================================");
    trade_esclient
      .search({
        index: "apart_trades",
        body: {
          sort: [{ date: "asc" }],
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

module.exports = {
  code1,
};
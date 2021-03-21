var request = require("request");

var headers = {
  "Content-Type": "application/json",
};

var dataString = "@apart_trade.json";

var options = {
  url: "http://localhost:9200/apart_trades/?v&pretty",
  method: "PUT",
  headers: headers,
  body: dataString,
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
  if (error) console.log(error);
  console.log(response);
}

request(options, callback);

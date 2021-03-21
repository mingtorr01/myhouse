const { combineReducers } = require("redux");
var client = require("./connection.js");

client.indices.delete({ index: "gov" }, function (err, resp, status) {
  console.log("delete", resp);
});

//curl -XGET "http://localhost:9200/apart_trades/?v&pretty"

// CRUD

//https://jhkang-tech.tistory.com/88

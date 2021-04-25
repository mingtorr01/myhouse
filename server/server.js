const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const bodyParser = require("body-parser");

//app.use(express.json()); //bodyparser 역할 없으면 req.body 안먹힌다.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
const route = require("./routes/mongod");
app.use("/db", route); //라우팅
const route2 = require("./routes/get_idx");
app.use("/api", route2);

const elasticsearch = require("elasticsearch");
const http2 = require("http");
const path = require("path");
//.......................................................................................................................
var fs = require("fs");
const { type } = require("os");

var dFilePath = path.join(__dirname, "district_latlng.csv");
var cFilePath = path.join(__dirname, "city_latlng.csv");

var data = fs.readFileSync(dFilePath, { encoding: "utf8" });
var rows = data.split("\n");
var districts = [];

var dcolumns = ["district", "lat", "lng"];
for (var rowIndex in rows) {
  var row = rows[rowIndex].split(",");

  var data = {}; // 빈 객체를 생성하고 여기에 데이터를 추가한다.
  for (var columnIndex in dcolumns) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    var column = dcolumns[columnIndex];
    data[column] = row[columnIndex];
  }
  districts.push(data);
}

var cities = [];

var ccolumns = ["city", "lat", "lng"];
data = fs.readFileSync(cFilePath, { encoding: "utf8" });
rows = data.split("\n");
for (var rowIndex in rows) {
  var row = rows[rowIndex].split(",");

  var data = {}; // 빈 객체를 생성하고 여기에 데이터를 추가한다.
  for (var columnIndex in ccolumns) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    var column = ccolumns[columnIndex];
    data[column] = row[columnIndex];
  }
  cities.push(data);
}
cities = cities.slice(0, -1);
districts = districts.slice(0, -1);

var trade_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
});
var deposit_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
});
var rent_esclient = new elasticsearch.Client({
  host: "http://localhost:9200",
});

//..............................................................................................................................
io.on("connection", function (socket) {
  console.log("user connection");

  socket.on("bound", function (data) {
    console.log(data.type);
    if (data.type == "apart_trades" || data.type == "office_trades") {
      trade_esclient.searchTarget(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "apart_deposits") {
      deposit_esclient.searchTarget(data.sw, data.ne, "apart_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "office_deposits") {
      deposit_esclient.searchTarget(data.sw, data.ne, "office_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
    if (data.type == "apart_rents" || data.type == "office_rents") {
      rent_esclient.searchTarget(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
  });

  socket.on("dong", function (data) {
    console.log(data.type);
    if (data.type == "apart_trades" || data.type == "office_trades") {
      trade_esclient.searchDong(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "apart_deposits") {
      deposit_esclient.searchDong(data.sw, data.ne, "apart_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "office_deposits") {
      deposit_esclient.searchDong(data.sw, data.ne, "office_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
    if (data.type == "apart_rents" || data.type == "office_rents") {
      rent_esclient.searchDong(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
  });

  socket.on("district", function (data) {
    console.log(data.type);
    if (data.type == "apart_trades" || data.type == "office_trades") {
      trade_esclient.searchDistrict(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "apart_deposits") {
      deposit_esclient.searchDistrict(data.sw, data.ne, "apart_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "office_deposits") {
      deposit_esclient.searchDistrict(data.sw, data.ne, "office_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
    if (data.type == "apart_rents" || data.type == "office_rents") {
      rent_esclient.searchDistrict(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
  });

  socket.on("city", function (data) {
    console.log(data.type);
    if (data.type == "apart_trades" || data.type == "office_trades") {
      trade_esclient.searchCity(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "apart_deposits") {
      deposit_esclient.searchCity(data.sw, data.ne, "apart_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }

    if (data.type == "office_deposits") {
      deposit_esclient.searchCity(data.sw, data.ne, "office_rents").then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
    if (data.type == "apart_rents" || data.type == "office_rents") {
      rent_esclient.searchCity(data.sw, data.ne, data.type).then(function (result) {
        io.to(socket.id).emit("marker", result);
      });
    }
  });
});

trade_esclient.searchTarget = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "name",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "trade_price",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location", "code"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          console.log(resp.aggregations.name_aggs.buckets);
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

trade_esclient.searchDong = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "dong",
                size: 100,
              },

              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "trade_price",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          console.log(resp.aggregations.name_aggs.buckets);
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

trade_esclient.searchDistrict = function (sw, ne, type) {
  var selectedDistrict = [];

  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    console.log(districts[index].lat);
    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index].district);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                terms: {
                  sub_city: selectedDistrict,
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "sub_city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "trade_price",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          console.log(resp.aggregations.name_aggs.buckets);
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

trade_esclient.searchCity = function (sw, ne, type) {
  var selectedDistrict = [];

  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    //console.log(districts[index]);

    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index]);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          aggs: {
            name_aggs: {
              terms: {
                field: "dong",
                size: 100,
              },
              terms: {
                field: "city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "trade_price",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          console.log(resp.aggregations.name_aggs.buckets);
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

deposit_esclient.searchTarget = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
              must_not: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "name",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "deposit",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};
deposit_esclient.searchDong = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
              must_not: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "dong",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "deposit",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

deposit_esclient.searchDistrict = function (sw, ne, type) {
  var selectedDistrict = [];

  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index].district);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                terms: {
                  sub_city: selectedDistrict,
                },
              },
              must_not: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "sub_city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "deposit",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

deposit_esclient.searchCity = function (sw, ne, type) {
  var selectedDistrict = [];

  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index]);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              must_not: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "deposit",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};
rent_esclient.searchTarget = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
              must: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "name",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "rental_fee",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};
rent_esclient.searchDong = function (sw, ne, type) {
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                geo_bounding_box: {
                  location: {
                    top_left: {
                      lat: ne.Ma,
                      lon: sw.La,
                    },
                    bottom_right: {
                      lat: sw.Ma,
                      lon: ne.La,
                    },
                  },
                },
              },
              must: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "dong",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "rental_fee",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

rent_esclient.searchDistrict = function (sw, ne, type) {
  var selectedDistrict = [];

  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index].district);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              filter: {
                terms: {
                  sub_city: selectedDistrict,
                },
              },
              must: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "sub_city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "rental_fee",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

rent_esclient.searchCity = function (sw, ne, type) {
  var selectedDistrict = [];

  console.log(type);
  for (var index in districts) {
    // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
    if (districts[index].lat <= ne.Ma && districts[index].lat >= sw.Ma && districts[index].lng <= ne.La && districts[index].lng >= sw.La) {
      selectedDistrict.push(districts[index]);
    }
  }
  return new Promise(function (resolve, reject) {
    trade_esclient
      .search({
        index: type,
        body: {
          size: 0,
          query: {
            bool: {
              must: {
                range: {
                  rental_fee: { gt: 0 },
                },
              },
            },
          },
          aggs: {
            name_aggs: {
              terms: {
                field: "city",
                size: 100,
              },
              aggs: {
                avg_trade_price: {
                  avg: {
                    field: "rental_fee",
                  },
                },
                location: {
                  top_hits: {
                    size: 1,
                    _source: { include: ["location"] },
                  },
                },
              },
            },
          },
        },
      })
      .then(
        function (resp) {
          resolve(resp.aggregations.name_aggs.buckets);
        },
        function (err) {
          reject(err.message);
        }
      );
  });
};

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

//app.use(express.json()); //bodyparser 역할 없으면 req.body 안먹힌다.
app.use(bodyParser.json());
app.use(cors()); // 서버와 클라이언트 사이의 크로스 도메인 헤더 라이브러리

const route = require("./routes/mongod");
//app.use("/db", route); //라우팅

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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
                      lat: ne._lat,
                      lon: sw._lng,
                    },
                    bottom_right: {
                      lat: sw._lat,
                      lon: ne._lng,
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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
    if (districts[index].lat <= ne._lat && districts[index].lat >= sw._lat && districts[index].lng <= ne._lng && districts[index].lng >= sw._lng) {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const e = require("cors");
const express = require("express");
const router = express.Router();
const es2 = require("./esclient");
router.post("/clickevent", (req, res) => {
  const tp = req.body.types;
  let type = "";
  if (tp.includes("trade")) {
    const location = {
      lat: req.body.position_x,
      lon: req.body.position_y,
      index: req.body.types,
    };
    es2.code1(location).then(function (result) {
      const data = [];
      result.hits.hits.map((v, i, a) => {
        console.log(v._source.trade_price);
        data.push(v._source);
      });
      res.send(data);
    });
  } else if (tp.includes("deposit")) {
    type = tp.split("_")[0] + "_rents";
    const location = {
      lat: req.body.position_x,
      lon: req.body.position_y,
      index: type,
    };
    es2.deposit(location).then(function (result) {
      const data = [];
      result.hits.hits.map((v, i, a) => {
        data.push(v._source);
      });
      res.send(data);
    });
  } else {
    const location = {
      lat: req.body.position_x,
      lon: req.body.position_y,
      index: req.body.types,
    };
    es2.rent(location).then(function (result) {
      const data = [];
      result.hits.hits.map((v, i, a) => {
        data.push(v._source);
      });
      res.send(data);
    });
  }
});

router.post("/getlocation", (req, res) => {});

/*
router.post("/clickevent", (req, res) => {
  const location = {
    lat: req.body.position_x,
    lon: req.body.position_y,
  };
  es2.code1(location).then(function (result) {
    const data = [];
    result.hits.hits.map((v, i, a) => {
      data.push(v._source);
    });
    res.send(data);
  });
});
*/
module.exports = router;
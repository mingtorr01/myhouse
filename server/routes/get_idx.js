const express = require("express");
const router = express.Router();
const es2 = require("./esclient");
router.post("/clickevent", (req, res) => {
  const location = {
    lat: req.body.position_x,
    lon: req.body.position_y,
    location: req.body.types,
  };
  es2.code1(location).then(function (result) {
    const data = [];
    const rent = [];
    const deposit = [];
    if (req.body.types.includes("trade")) {
      result.hits.hits.map((v, i, a) => {
        console.log(v._source.trade_price);
        data.push(v._source);
      });
      res.send(data);
    } else {
      result.hits.hits.map((v, i, a) => {
        if (v._source.rental_fee === 0) {
          rent.push(v._source);
        } else {
          deposit.push(v._source);
        }
        // 마지막인거 테스트
        if (i === result.hits.hits.length - 1) {
          const ret = {
            rents: rent,
            deposits: deposit,
          };
          res.send(ret);
        }
      });
    }
  });
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

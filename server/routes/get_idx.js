const express = require("express");
const router = express.Router();
const es2 = require("./esclient");
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

router.post("/getlocation", (req, res) => {});

module.exports = router;

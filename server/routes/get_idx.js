const express = require("express");
const router = express.Router();
const es2 = require("./esclient");
router.post("/clickevent", (req, res) => {
  console.log("웅웅앙앙");
  console.log(req.body);
  const location = {
    lat: req.body.position_x,
    lon: req.body.position_y,
  };
  es2.code1(location).then(function (result) {
    console.log("hi");
    console.log(result);
    const data = [];
    result.hits.hits.map((v, i, a) => {
      console.log(v._source);
      data.push(v._source);
    });
    res.send(data);
  });
});

module.exports = router;

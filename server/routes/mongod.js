const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("./land");
const location1 = require("./location");

require("dotenv").config({ path: __dirname + "/./../../.env" });

console.log(process.env.REACT_APP_MONGO_URI);
const uri = process.env.REACT_APP_MONGO_URI; // mongoDB Connect 정보

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error);
db.once("open", function () {
  // 몽고디비 서버에 연결
  console.log("Connected to mongod server");
});
/*
router.post("/point", (req, res) => {
  console.log(req.body);
  const rank = [];
  const name = [];
  const value = 0;
  req.body.map((p, index) => {
    console.log(p);
    if (p.name == "녹지비율") {
      land
        .find()
        .lte("rank", 10)
        .sort("rank")
        .then((data) => {
          console.log("hi");
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else if (p.name == "미세먼지") {
      weather
        .find()
        .lte("rank", 10)
        .sort("rank")
        .then((data) => {
          data.map((d, index) => {
            console.log(d);
          });
        })
        .catch((err) => console.log(err));
    }
  });
  rank.land;
});*/

router.post("/getLocation", (req, res) => {
  console.log(req.body);
  const locations = req.body.location;
  console.log(locations);
  location1.find({ _시도: locations }, { _id: 0, _시군구: 1 }).then((data) => {
    console.log(data);
  });
});
module.exports = router;

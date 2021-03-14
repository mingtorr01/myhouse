const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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

router.get("/message", function (req, res, next) {
  res.send(process.env.MESSAGE);
});

module.exports = router;

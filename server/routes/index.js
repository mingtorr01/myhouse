const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // 몽고디비 서버에 연결
  console.log("Connected to mongod server");
});

router.get("/");

module.exports = router;

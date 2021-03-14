const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI; // mongoDB Connect 정보
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
console.log("config", config.mongoURI);
/*
db.on("error", console.error);
db.once("open", function () {
  // 몽고디비 서버에 연결
  console.log("Connected to mongod server");
});

router.get("/");
*/
module.exports = router;

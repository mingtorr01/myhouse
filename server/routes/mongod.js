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

// 찾기명령
db.collection("녹지비율").findOne({ _id: "604e0d6249f0520cb073fb48" }, function (err, data) {
  console.log(data);
});

// User 전체 조회
router.get("/", function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("User 전체 조회 실패.");
    res.status(200).send(users);
  });
});
// User 조회
router.get("/:id", function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("User 조회 실패");
    if (!user) return res.status(404).send("User 없음.");
    res.status(200).send(user);
  });
});
// User 삭제
router.delete("/:id", function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("User 삭제 실패");
    res.status(200).send("User " + user.name + " 삭제됨.");
  });
});
// User 수정
router.put("/:id", function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
    if (err) return res.status(500).send("User 수정 실패.");
    res.status(200).send(user);
  });
});

module.exports = router;

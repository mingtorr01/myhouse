const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  시도시군구: {
    type: String,
  },
  "녹지(녹피)면적비율(%)": {
    type: String,
  },
  rank: {
    type: Number,
  },
  "총 녹지(녹피)면적(㎢)": {
    type: String,
  },
  "행정구역면적(㎢)": {
    type: String,
  },
});

module.exports = mongoose.model("녹지비율", userSchema);

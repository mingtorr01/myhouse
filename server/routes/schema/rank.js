const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  tot_oa_cd: {
    type: String,
  },
  sido: {
    type: String,
  },
  city: {
    type: String,
  },
  dong: {
    type: String,
  },
  다세대주택수: {
    type: Number,
  },
  단독주택수: {
    type: Number,
  },
  노후주택비율: {
    type: Number,
  },
  총주택수: {
    type: Number,
  },
  노령화지수: {
    type: Number,
  },
  인구밀도: {
    type: Number,
  },
  총인구: {
    type: Number,
  },
  평균나이: {
    type: Number,
  },
  평균가구원수: {
    type: Number,
  },
});

module.exports = mongoose.model("랭크", userSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  rank: {
    type: Number,
  },
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
  point: {
    type: Number,
  },
  data: {
    type: Number,
  },
});

module.exports = mongoose.model("총주택수", userSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  _시도: {
    type: String,
  },
  _시군구: {
    type: String,
  },
});

module.exports = mongoose.model("시도", userSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    title: String,
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
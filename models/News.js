var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
  title: String,
  description: String
});

var News = mongoose.model("News", NewsSchema);

module.exports = News;
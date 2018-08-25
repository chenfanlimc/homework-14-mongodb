var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    title: String,
    description: String,
    url: String
}, { collection: 'ksl' });

var ksl = mongoose.model("ksl", NewsSchema);

module.exports = ksl;
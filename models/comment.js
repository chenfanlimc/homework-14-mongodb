var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    comment_text: String
}, { collection: 'comment' });

var comment = mongoose.model("comment", CommentSchema);

module.exports = comment;
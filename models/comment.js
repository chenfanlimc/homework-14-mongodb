var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    comment_text: String,
    article: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the Note model
            ref: "ksl"
        }
    ]
}, { collection: 'comment' });

var comment = mongoose.model("comment", CommentSchema);

module.exports = comment;
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    title: String,
    description: String,
    url: String,
    comment: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the comment model
            ref: "comment"
        }
    ]
}, { collection: 'ksl' });

var ksl = mongoose.model("ksl", NewsSchema);

module.exports = ksl;
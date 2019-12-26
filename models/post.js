var mongoose = require("mongoose");
     
// ŞEMA
var postSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    content: String,
    created: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blogger"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
 
module.exports = mongoose.model("Post", postSchema);
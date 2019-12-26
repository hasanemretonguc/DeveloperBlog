var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var bloggerScheme = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    username: String,
    picture: String,
    description: String,
    social: {
        twitter: String,
        linkedln: String,
        github: String,
        stackoverflow: String
    },
    mail: String,
    created: { type: Date, default: Date.now },
});
 
bloggerScheme.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("Blogger", bloggerScheme);
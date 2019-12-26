var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
 
var userScheme = new mongoose.Schema({
    username: { type: String },
    password: String,
    name: {
        first: String,
        last: String
    },
    picture: String,
    mail: String,
    created: { type: Date, default: Date.now }
});
 
userScheme.plugin(passportLocalMongoose);
 
module.exports = mongoose.model("User", userScheme);
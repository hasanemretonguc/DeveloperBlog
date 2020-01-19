var mongoose = require("mongoose");
     
// ŞEMA
var aboutSchema = new mongoose.Schema({
    content: String,
    created: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model("About", aboutSchema);
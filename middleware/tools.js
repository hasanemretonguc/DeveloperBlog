const Blogger = require("../models/blogger"),
  mongoose = require("mongoose");
var tools = {};

var blogger;
//VERITABANI ACILANA KADAR BEKLEYIP ACILDIKTAN SONRA BLOGGERI CEKIYOR
setTimeout(waitDBConnection, 500);
function waitDBConnection () {
    if (mongoose.connection.readyState === 1) {
        cacheBlogger();
    }
    else {
        console.log("Veritabani bekleniyor...");
        setTimeout(waitDBConnection, 500);
    }
}
// VERITABANINDAN AYNI VERIYI 1000 KERE CEKMENIN MANASI YOK EN BASTA BIR KERE CEKIP BIR KOSEYE KOYUYORUM.
function cacheBlogger() {
  Blogger.findOne({})
    .then(master => {
      blogger = master;
      console.log(blogger.name.first + " Hosgeldiniz");
    })
    .catch(err => {
      console.log(err);
    });
}

tools.currentBlogger = (req, res, next) => {
  res.locals.blogger = blogger;
  next();
};

module.exports = tools;

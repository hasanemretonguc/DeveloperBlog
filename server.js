const express = require("express"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  bodyParse = require("body-parser"),
  flash = require("connect-flash"),
  localStrategy = require("passport-local"),
  passport = require("passport"),
  app = express();

const tools = require("./middleware/tools");

const mainRoutes = require("./routes/landing"),
  postRoutes = require("./routes/post");

app.use("/", mainRoutes);
app.use("/post", postRoutes);

const staticOptions = {
  index: false,
  immutable: true,
  cacheControl: true,
  maxAge: "30d"
};

const dbOptions = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

var dbURL = process.env.BLOGDBURL || "mongodb://localhost/devblog";
var svPort = process.env.PORT || 3000;
//SET

app.use(bodyParse.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public", staticOptions));
app.use(express.static(__dirname + "/views/scripts"));
app.use(express.static(__dirname + "/node_modules"));
app.set("view engine", "ejs");
app.use(express.json());

app.use(
  require("express-session")({
    secret: "HELIGMAZEKA-ZEYNEL-DEVELOPERBLOG-1071",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.blogger = req.blogger;
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(dbURL, dbOptions)
  .then(() =>
    app.listen(svPort, () => {
      console.log("Veritabanina Aktif!");
      console.log("Sunucu Aktif!");
    })
  )
  .catch(err => {
    console.log("VERITABANINA ULASILAMIYOR!!!!");
  });

mongoose.connection.once("open", () => {
  // DEPLOY EDERKEN KALDIR
  // BOS VERI
  const seedDB = require("./seeds");
  seedDB();
});

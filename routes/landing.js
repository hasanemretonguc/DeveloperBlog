const express = require("express"),
  router = express.Router();

const Post = require("../models/post");
const tools = require("../middleware/tools");

router.get("/", tools.currentBlogger, function(req, res) {
  Post.find({}, (err, foundPosts) => {
    res.render("landing", {posts: foundPosts});
  });
});

router.get("/about", tools.currentBlogger, (req, res) => {
  res.render("about");
});

module.exports = router;

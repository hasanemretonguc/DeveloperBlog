const express = require("express"),
  tools = require("../middleware/tools"),
  router = express.Router();

const Post = require("../models/post");

router.post("/", (req, res) => {
    console.log(req.body.title);
});

router.get("/newpost", tools.currentBlogger, (req, res) => {
  res.render("posts/addpost");
});

router.get("/:id", tools.currentBlogger, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) console.log(req.params.id + " kimligine sahip posta erisilmeye calisildi. Bu kimlige sahip post bulunamadi!");
    res.render("posts/post", { post: foundPost });
  });
});

module.exports = router;

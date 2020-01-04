const express = require("express"),
  tools = require("../middleware/tools"),
  multer = require("multer"),
  path = require("path"),
  multipart = require("connect-multiparty"),
  router = express.Router();

var multipartMiddleware = multipart();
const Post = require("../models/post");

//#region DOSYA YUKLEMEK ICIN GEREKLI AYARLAR
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tools.imagesPath); // DOSYANIN YUKLENECEGI KONUM
  },
  filename: function(req, file, cb) {
    cb(
      null,
      "upload_" +
        file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    ); // YUKLENEN DOSYANIN ADI
  }
});
var upload = multer({ storage: storage });
//#endregion

// BLOG EKLEME SAYFASINI AC
router.get("/addpost", tools.currentBlogger, tools.Pictures, (req, res) => {
  res.render("posts/addpost");
});

// BLOG EKLE                                  BU CALISIYOR AMA BURDA OLMAMASI GEREKIYOR
router.post("/addpost", express.urlencoded({ extended: true }), (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var thumbnail = req.body.thumbnail;
  var content = req.body.richText; // Bunun adı kaldı böyle kullandığım eklentidede bu şekilde o yüzden değiştirmedim
  var author = res.locals.blogger;

  //var { title, description, thumbnail, richText: content } = req.body;

  var createdPost = {
    title: title,
    thumbnail: thumbnail,
    description: description,
    content: content,
    author: author
  };

  Post.create(createdPost, (err, newPost) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

// BLOG EKLEMEDE RESIM EKLE
router.post("/upload", upload.single("image"), (req, res) => {
  res.redirect(req.get("referer"));
});
// CKEDITOR DOSYA YUKLEME
router.post("/uploadck", upload.single("image"), tools.Pictures, function(req, res) {
	
});
// BLOG GOSTER
router.get("/:id", tools.currentBlogger, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err)
      console.log(
        req.params.id +
          " kimligine sahip posta erisilmeye calisildi. Bu kimlige sahip post bulunamadi!"
      );
    res.render("posts/post", { post: foundPost });
  });
});

module.exports = router;

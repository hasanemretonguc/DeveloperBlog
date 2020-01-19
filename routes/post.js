const express = require("express"),
  tools = require("../middleware/tools"),
  multer = require("multer"),
  path = require("path"),
  router = express.Router();

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

// #region CKEDITOR DOSYA YUKLEME
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
router.post("/uploadck", tools.Pictures, multipartMiddleware, function(req, res) {
	var fs = require('fs');

    fs.readFile(req.files.upload.path, function (err, data) {
        var newPath = tools.imagesPath + req.files.upload.name;
        fs.writeFile(newPath, data, function (err) {
            if (err) console.log({err: err});
            else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/assets/images/blog/" + req.files.upload.name + "\";";
                html += "    var message = \"Resim basariyla yuklendi!\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";

                res.send(html);
            }
        });
    });
});
// #endregion

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

// #region POST DUZENLE
router.get("/:id/edit", tools.currentBlogger, tools.Pictures, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err)
      console.log(
        req.params.id +
          " kimligine sahip posta erisilmeye calisildi. Bu kimlige sahip post bulunamadi!"
      );
    res.render("posts/editpost", { post: foundPost });
  });
});

router.post("/:id/edit", express.urlencoded({ extended: true }), (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post,(err, result) => {
    if(err) console.log(err);
    else {
      res.redirect("/post/"+req.params.id);
    }
  });
});
// #endregion 

router.get("/:id/delete", (req, res) => {
  Post.findByIdAndRemove(req.params.id
    ).then(master => {
    })
    .catch(err => {
      console.log(err);
  });
  res.redirect("/");
});

module.exports = router;

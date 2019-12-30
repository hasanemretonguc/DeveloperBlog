const express = require('express'),
	tools = require('../middleware/tools'),
	router = express.Router();

const Post = require('../models/post');

// BLOG EKLEME SAYFASINI AC
router.get('/newpost', tools.currentBlogger, (req, res) => {
	res.render('posts/addpost');
});

// BLOG EKLE                                  // BU CALISIYOR AMA BURDA OLMAMASI GEREKIYOR
router.post('/addpost', tools.currentBlogger, express.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  
	var title = req.body.title;
  var description = req.body.description;
  var thumbnail_img = req.body.thumbnail;
  var content = req.body.richText; // Bunun adı kaldı böyle kullandığım eklentidede bu şekilde o yüzden değiştirmedim
  
  var author = { id: res.locals.blogger.id, username: res.locals.blogger };
  
	var createdPost = {
		title: title,
		thumbnail: thumbnail_img,
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

// BLOG GOSTER
router.get('/:id', tools.currentBlogger, (req, res) => {
	Post.findById(req.params.id, (err, foundPost) => {
		if (err)
			console.log(
				req.params.id + ' kimligine sahip posta erisilmeye calisildi. Bu kimlige sahip post bulunamadi!'
			);
		res.render('posts/post', { post: foundPost });
	});
});

module.exports = router;

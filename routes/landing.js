const express = require('express'),
	Blogger = require("../models/blogger"),
	About = require("../models/about"),
	router = express.Router();

const Post = require('../models/post');
const tools = require('../middleware/tools');

router.get('/', tools.currentBlogger, function (req, res) {
	Post.find({}, (err, foundPosts) => {
		res.render('landing', { posts: foundPosts });
	});
});

router.get('/about', tools.currentBlogger, (req, res) => {
	About.findOne((err, about) => {
		if (err)
			console.log("Hakkimdada bisi var!");
		res.render("aboutme", { about: about });
	});
	//res.render('about');
});

// #region Hakkimda Duzenle
router.get("/about/edit", tools.currentBlogger, (req, res) => {
	About.findOne((err, about) => {
		if (err)
			console.log("Hakkimdada bisi var!");
		else {
			res.render('admin/aboutedit', { about: about });
		}
	});
});
router.post("/about", tools.currentBlogger, express.urlencoded({ extended: true }), (req, res) => {
	About.findOneAndUpdate(req.body.about).then(master => {
		About.findOne((err, about) => {
			if (err)
				console.log("Hakkimdada bisi var!");
			res.render("aboutme", { about: about });
		});
	}).catch(err => {
		res.redirect("/");
	});
});
// #endregion 

// #region Profil Duzenleme
router.get("/profile/edit", tools.currentBlogger, tools.Pictures, (req, res) => {
	res.render('admin/profileedit');
});

router.post("/profile", tools.currentBlogger, express.urlencoded({ extended: true }), (req, res) => {
	var updatedBlogger = res.locals.blogger;
	updatedBlogger.name = req.body.name;
	updatedBlogger.username = req.body.username;
	updatedBlogger.picture = req.body.picture;
	updatedBlogger.social = req.body.social;
	updatedBlogger.mail = req.body.mail;
	updatedBlogger.description = req.body.description;
	Blogger.findOneAndUpdate(res.locals.blogger.id, updatedBlogger).then(master => {
		if (master) tools.forceBlogger();
	}).catch(err => {
		console.log(err);
	});
	res.redirect("/");
});
// #endregion

module.exports = router;

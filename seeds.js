var mongoose = require("mongoose"),
  //Post = require("./models/post"),
  Blogger = require("./models/blogger"),
  About = require("./models/about"),
Post = require("./models/post");

var ready = false;

var myblogger = {
  name: {
    first: "Hasan Emre",
    last: "Tonguc"
  },
  username: "UCANSISMAN",
  picture: "https://avatars2.githubusercontent.com/u/13487220?s=460&v=4",
  description:
    "Merhaba, ben Emre oyun gelistiricisi ve full stack web programcisiyim.",
  social: {
    twitter: "https://twitter.com/HasanEmreTonguc",
    linkedln: "https://www.linkedin.com/in/hasan-emre-tongu%C3%A7-4b19b2166/",
    github: "https://github.com/hasanemretonguc",
    stackoverflow: ""
  },
  mail: "hasanemretonguc@gmail.com"
};

var myabout = {
  content: "Buraya content gelecek babbba"
};

var posts = [
  {
    title: "Neden her gelistiricinin kendi blogu olmali?",
    thumbnail: "/assets/images/blog/blog-post-thumb-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    content:
      "<p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Neden her gelistiricinin kendi blogu olmali?",
    thumbnail: "/assets/images/blog/blog-post-thumb-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    content:
      "<p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Neden her gelistiricinin kendi blogu olmali?",
    thumbnail: "/assets/images/blog/blog-post-thumb-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    content:
      "<p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Neden her gelistiricinin kendi blogu olmali?",
    thumbnail: "/assets/images/blog/blog-post-thumb-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    content:
      "<p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Neden her gelistiricinin kendi blogu olmali?",
    thumbnail: "/assets/images/blog/blog-post-thumb-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    content:
      "<p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Ne bilim?",
    thumbnail: "/assets/images/blog/blog-post-thumb-3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac.",
    content:
      "<h1> NICE </h1> <p>Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>",
    author: myblogger
  },
  {
    title: "Hakkımda",
    thumbnail: "/assets/images/blog/blog-post-thumb-3.jpg",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac.",
    content: "",
    author: myblogger
  }
];

function seedDB() {
  Blogger.deleteMany({}, err => {
    if (err) return console.log("blogger silinemedi!");
    Blogger.create(myblogger, (err, owner) => {
      if (err) return console.log("blogger eklenemedi!");
      console.log("Blogger eklendi!");
      Post.deleteMany({}, err => {
        if (err) return console.log("post silinemedi!");
        posts.forEach(element => {
          Post.create(element, (err, postSD) => {
            if (err) return console.log("post eklenemedi!\n" + err);
            console.log("Post eklendi!");
            postSD.save();
            ready = true;
          });
        });
      });
      owner.save();
    });
  });
  About.deleteMany({}, err => {
    if (err) return console.log("Hakkimda silinemedi!");
    About.create(myabout).then(master => {
      console.log("Hakkimda Eklendi!");
      ready = true;
    }).catch(err => {
      console.log("Hakkimda Eklenemedi!");
      ready = false;
    });
  });
}

module.exports = seedDB;

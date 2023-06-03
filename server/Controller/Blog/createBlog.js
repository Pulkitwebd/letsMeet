const Blog = require("../../Schemas/blog.js");

const createBlog = async (req, res) => {
  try {
    const post = new Blog({
      title: req.body.title,
      mainImage: req.body.mainImage,
      headings: req.body.headings,
      author: req.body.author,
      category : req.body.category
    });

    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = createBlog;

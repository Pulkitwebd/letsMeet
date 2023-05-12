const Blog = require("../../Schemas/blog");

const getBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

module.exports = getBlogById;

const Blog = require("../../Schemas/blog");

const allBlogs = async (req, res) => {
  try {
    // pageNumber started with 0
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalPosts = await Blog.count().exec();

    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;

    result.totalPosts = totalPosts;

    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1, 
        limit: limit,
      };
    }

    if (endIndex < (await Blog.count().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    result.data = await Blog.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();

    result.rowsPerPage = limit;
    return res.json({ msg: "Blogs Fetched successfully", data: result });
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, something went wrong" , error});
  }
};

module.exports = allBlogs;
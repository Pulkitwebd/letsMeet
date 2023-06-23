const Feed = require("../../Schemas/feed.js");

const allEvents = async (req, res) => {
  try {
    // pageNumber started with 0
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalPosts = await Feed.countDocuments().exec();

    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;

    result.totalPosts = totalPosts;

    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }

    if (endIndex < (await Feed.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    const feedData = await Feed.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: "user_id",
        select: "photo",
      }) // Populate the user_id field with user photo
      .exec();

    result.data = feedData;
    result.rowsPerPage = limit;

    return res.json({ msg: "Posts Fetched successfully", data: result });
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, something went wrong", error });
  }
};

module.exports = allEvents;

const Feed = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");

const feedPost = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, something went wrong" , error});
  }
};
module.exports = feedPost;

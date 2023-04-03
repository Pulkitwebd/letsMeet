const Feed = require("../../Schemas/feedSchema.js");
const User = require("../../Schemas/userSchema.js");

const feedPost = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, something went wrong" , error});
  }
};
module.exports = feedPost;

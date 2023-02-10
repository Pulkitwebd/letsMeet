const Feed = require("../../Schemas/feedSchema.js");
const User = require("../../Schemas/userSchema.js");

const feedPost = async (req, res) => {
  try {
    const {
      user_id,
      postingDate,
      meetDate,
      address,
      personNeeded,
      category,
      organiserName,
      desc,
      eventImage,
      title
    } = req.body;

    const userExists = await User.findOne({ _id: user_id });

    if (userExists) {
      const event = await Feed.create({
        user_id,
        postingDate,
        meetDate,
        address,
        personNeeded,
        category,
        organiserName,
        desc,
        title,
        eventImage
      });

      res.status(201).json({ success: true, event: event });
    }
  } catch (error) {
    res.status(500).send(`${error}, event not created`);
  }
};
module.exports = feedPost;

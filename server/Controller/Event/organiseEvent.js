const Feed = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");

const feedPost = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      postingDate,
      meetDate,
      address,
      personNeeded,
      category,
      organiserName,
      desc,
      eventImage,
      title,
    } = req.body;

    const userExists = await User.findOne({ _id: userId });

    if (userExists) {
      const currentTime = new Date();
      const hourAgo = new Date();
      hourAgo.setHours(hourAgo.getHours() - 1);

      const eventCount = await Feed.countDocuments({
        userId,
        postingDate: { $gte: hourAgo, $lte: currentTime },
      });

      if (eventCount >= 3) {
        return res.status(429).json({
          success: false,
          message: "You Have Reached Hour limit",
        });
      }

      const event = await Feed.create({
        user_id: userId,
        postingDate,
        meetDate,
        address,
        personNeeded,
        category,
        organiserName,
        desc,
        title,
        eventImage,
      });

      res
        .status(201)
        .json({
          success: true,
          message: "Event Is Created! Successfully",
          event: event,
        });
    }
  } catch (error) {
    res.status(500).send(`${error}, event not created`);
  }
};

module.exports = feedPost;

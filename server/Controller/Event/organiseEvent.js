const Feed = require("../../Schemas/feedSchema.js");
const User = require("../../Schemas/userSchema.js");

const feedPost = async (req, res) => {
  try {
    const {
      user_id,
      postingDate,
      meetDate,
      locationOfMeet,
      currentUserLocation,
      city,
      personNeeded,
      category,
    } = req.body;

    const userExists = await User.findOne({ _id: user_id });

    if (userExists) {
      const multipleCategoriesAvailable = [
        "Cricket",
        "Chess",
        "Travel",
        "Badminton",
      ];

      var found = multipleCategoriesAvailable.includes(category);
      if (!found) {
        return res.status(409).send(`${category} category is not available`);
      }

      const event = await Feed.create({
        user_id,
        postingDate,
        meetDate,
        locationOfMeet,
        currentUserLocation,
        city,
        personNeeded,
        category,
      });

      res.status(201).json({ success: true, event: event });
    }
  } catch (error) {
    res.status(500).send(`${error}, event not created`);
  }
};
module.exports = feedPost;

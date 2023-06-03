const Feed = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");

const applyEvent = async (req, res) => {
  const { feedId, userId } = req.body;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ _id: userId });

    if (!user) {
      // Send an error response if the user doesn't exist
      return res.status(400).json({
        error: "User not found. Please create an account to apply for events.",
      });
    }

    // Check if the user has already applied to the event
    if (user.appliedEvents.includes(feedId)) {
      return res.status(400).json({
        error: "User has already applied.",
      });
    }

    // Add the user ID to the applicants array of the feed document
    const feedUpdateResult = await Feed.updateOne(
      { _id: feedId },
      { $addToSet: { applicants: userId } }
    );

    // Update the user document with the applied event
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $addToSet: { appliedEvents: feedId } }
    );

    res.status(200).json({
      feedUpdateResult,
      userUpdateResult,
      message: "Applied to event successfully",
    });
    
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = applyEvent;

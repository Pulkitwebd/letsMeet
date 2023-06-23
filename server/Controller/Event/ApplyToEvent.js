const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Feed = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");

const applyEvent = async (req, res) => {
  const _id = req.user._id;
  const feedId = req.body.feedId;

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ _id: _id }).lean();

    if (!user) {
      // Send an error response if the user doesn't exist
      return res.status(400).json({
        error: "User not found. Please create an account to apply for events.",
      });
    }
    // Convert feedId to ObjectId for comparison
    const feedObjectId = ObjectId(feedId);

    // Check if the user has already applied to the event
    if (user.appliedEvents.some((eventId) => eventId.equals(feedObjectId))) {
      return res.status(400).json({
        error: "User has already applied.",
      });
    }

    // Add the user ID to the applicants array of the feed document
    const feedUpdateResult = await Feed.updateOne(
      { _id: feedId },
      { $addToSet: { applicants: _id } }
    );

    // Update the user document with the applied event
    const userUpdateResult = await User.updateOne(
      { _id: _id },
      { $addToSet: { appliedEvents: feedId } }
    );

    const populatedFeed = await Feed.findById(feedId)
      .populate({
        path: "applicants",
        select: "_id firstname lastname email photo",
      })
      .lean();

    const applicants = populatedFeed.applicants.map((applicant) => ({
      _id: applicant._id,
      firstname: applicant.firstname,
      lastname: applicant.lastname,
      email: applicant.email,
      photo: applicant.photo,
    }));

    res.status(200).json({
      feedUpdateResult,
      userUpdateResult,
      applicants,
      message: "Applied to event successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = applyEvent;

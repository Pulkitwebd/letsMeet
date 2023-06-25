const Feed = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");
const mongoose = require("mongoose");

const DeleteEventById = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = mongoose.Types.ObjectId(req.body.eventId);

    // Delete the event from the Feed collection
    const deletedEvent = await Feed.findOneAndDelete({
      _id: eventId,
      user_id: userId,
    });

    if (!deletedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    // Remove the specific event ID from the user's appliedEvents array
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { appliedEvents: eventId } }
    );

    return res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Error deleting event ${error.message}` });
  }
};

module.exports = DeleteEventById;

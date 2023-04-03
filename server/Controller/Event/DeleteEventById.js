const Feed = require("../../Schemas/feedSchema.js");

const DeleteEventById = async (req, res) => {
  try {
    const { user_id, eventId } = req.body;
    const deletedEvent = await Feed.findOneAndDelete({
      _id: eventId,
      user_id: user_id,
    });
    if (!deletedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    return res.status(200).send({ message: "Event deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Error deleting event ${error.message}` });
  }
};

module.exports = DeleteEventById;

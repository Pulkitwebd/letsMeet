const Feed = require("../../Schemas/feedSchema.js");
// const User = require("../../Schemas/userSchema.js");

const Event = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Feed.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

module.exports = Event;

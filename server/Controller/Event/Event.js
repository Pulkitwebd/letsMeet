const Feed = require("../../Schemas/feedSchema.js");
// const User = require("../../Schemas/userSchema.js");

const Event = async (req, res) => {
  const eventId = req.params.id;

  Feed.findById(eventId, function (err, event) {
    if (err) {
      res.status(500).send(`${err}`);
    }
    if (!event) {
      res.status(404).json({ error: "Event not found" });
    } else {
      res.status(200).send(event);
    }
  });
};

module.exports = Event;

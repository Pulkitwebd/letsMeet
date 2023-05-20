const Event = require("../../Schemas/feed.js");
const User = require("../../Schemas/user.js");

const GetAppliedEvents = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const appliedEvents = user.appliedEvents;
    if (appliedEvents.length === 0) {
      return res.status(200).json({ message: "No events found for the user" });
    }

    const events = await Event.find({ _id: { $in: appliedEvents } });
    if (events.length === 0) {
      return res.status(200).json({ message: "No events found for the user" });
    }

    res.status(200).json(events);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

module.exports = GetAppliedEvents;


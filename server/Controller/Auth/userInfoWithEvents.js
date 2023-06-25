const User = require("../../Schemas/user.js");

const userInfoWithEvents = async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id).populate("appliedEvents");

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const appliedEvents = user.appliedEvents;
    if (appliedEvents.length === 0) {
      return res.status(200).json(user);
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

module.exports = userInfoWithEvents;

const User = require("../../Schemas/user.js");

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ success: false, message: `User with ID ${user_id} not found` });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).send(`${err}, could not get user data`);
  }
};

module.exports = getUserById;

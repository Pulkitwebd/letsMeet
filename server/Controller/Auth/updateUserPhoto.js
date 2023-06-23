const User = require("../../Schemas/user.js");

const updateUserPhoto = async (req, res) => {
  try {
    const userId = req.user._id;

    const { userPhoto } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(500).send(`${err}, user not found`);
      return;
    }

    user.photo = userPhoto;
    const updatedUser = await user.save();

    res.status(201).json({ success: true, updatedUser });
  } catch (err) {
    res.status(500).send(`${err}, user not updated`);
  }
};

module.exports = updateUserPhoto;

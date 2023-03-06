const User = require("../../Schemas/userSchema.js");

const updateUser = async (req, res) => {
  try {
    const { user_id, userPhoto } = req.body;

    const user = await User.findOne({ _id: user_id });
    
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

module.exports = updateUser;

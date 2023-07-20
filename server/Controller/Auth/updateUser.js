const User = require("../../Schemas/user.js");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { firstname, lastname, email, phone, age, password } = req.body;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedFields = {};

    const fieldsToUpdate = {
      firstname,
      lastname,
      email: email ? email.toLowerCase() : undefined,
      phone,
      age,
      password,
    };

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (value && user[key] !== value) {
        user[key] = value;
        updatedFields[key] = value;
      }
    }

    if (password) {
      const encryptPassword = await bcrypt.hash(password.toString(), 10);
      if (user.password !== encryptPassword) {
        user.password = encryptPassword;
        updatedFields.password = encryptPassword;
      }
    }

    await user.save();

    const updatedUser = await User.findById(user_id); // Retrieve the updated user object from the database

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser, 
      updatedFields,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = updateUser;


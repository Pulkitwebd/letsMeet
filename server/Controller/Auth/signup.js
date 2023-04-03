const User = require("../../Schemas/userSchema.js");
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../../shared/generateAuthToken.js");

const postRegister = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, age } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).send("Email already exist");
    }

    //encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);

    if (!(age >= 18 && age < 100)) {
      return res
        .status(409)
        .send("Age should be greater than 18 and less than 100");
    }

    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: encryptPassword,
      age,
      phone,
    });

    const token = generateAuthToken(user);

    res.status(201).json({ success: true, user, token });
  } catch (err) {
    res.status(500).send(`${err}, user not created`);
  }
};

module.exports = postRegister;

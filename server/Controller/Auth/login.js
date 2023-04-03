const User = require("../../Schemas/userSchema.js");
const bcrypt = require("bcryptjs");
const generateAuthToken = require("../../shared/generateAuthToken.js");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateAuthToken(user);
      return res.status(200).send({ user, token });
    }
    return res.status(400).send("Invalid credential! Please try again");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = postLogin;

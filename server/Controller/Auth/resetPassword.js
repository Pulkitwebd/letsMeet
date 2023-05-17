const User = require("../../Schemas/user.js");
const bcrypt = require("bcryptjs");

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ resetPasswordToken: token });

    if (tokenData) {
      const password = req.body.password;

      //encrypt password
      const passwordHash = await bcrypt.hash(password, 10);

      const userData = await User.findByIdAndUpdate({_id : tokenData._id}, {$set:{password:passwordHash , resetPasswordToken:''}}, {new:true});

      res.status(200).send({ success: true, msg: "User password has been reset", data : userData});
    } else {
      res.status(200).send({ success: true, msg: "This token is not valid" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = resetPassword;

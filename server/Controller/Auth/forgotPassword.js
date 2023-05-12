const User = require("../../Schemas/user.js");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Let's meet - Reset Your Password",
      html: `<p>Hi ${name}, Please copy the Link and <a href="http://localhost:3000/reset-password?token=${token}"> reset your password</a></p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const forgot_password = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const randomString = randomstring.generate();

      await User.updateOne(
        { email: email },
        { $set: { resetPasswordToken: randomString } }
      );

      sendResetPasswordMail(
        `${user.firstname} ${user.lastname}`,
        user.email,
        randomString
        );

        res
          .status(200)
          .send("Please check your email inbox and reset your password");
      } else {
        res.status(400).send("This email does not exist");
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  module.exports = forgot_password;
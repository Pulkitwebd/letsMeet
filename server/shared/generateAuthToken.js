const jwt = require("jsonwebtoken");

function generateAuthToken(user) {
  console.log(user.email, user.email.toLowerCase())
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      userName: `${user.firstname} ${user.lastname}`,
      email : user.email.toLowerCase()
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
}

module.exports = generateAuthToken;

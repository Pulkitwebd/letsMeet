const jwt = require("jsonwebtoken");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      userName: `${user.firstname} ${user.lastname}`,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
}

module.exports = generateAuthToken;

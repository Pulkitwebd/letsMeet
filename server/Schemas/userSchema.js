const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },

  phone: {
    type: Number,
    unique: true,
  },

  age: {
    type: Number,
  },

  resetPasswordToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

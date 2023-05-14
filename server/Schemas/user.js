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

  photo: {
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

  appliedEvents: {
    type: [String], // Array of string values representing event IDs
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

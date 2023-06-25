const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

  friends: [{ type: Schema.Types.Object, ref: "User" }],

  resetPasswordToken: {
    type: String,
    default: "",
  },

  appliedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

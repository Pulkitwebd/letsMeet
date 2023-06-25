const mongoose = require("mongoose");

const feedSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  postingDate: {
    type: Date,
  },

  address: {},

  personNeeded: {
    type: Number,
  },

  meetDate: {
    type: String,
  },

  category: {
    type: String,
  },

  desc: {
    type: String,
  },

  title: {
    type: String,
  },

  organiserName: {
    type: String,
  },

  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  eventImage: String,
});

const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;

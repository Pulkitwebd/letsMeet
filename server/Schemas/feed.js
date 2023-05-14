const mongoose = require("mongoose");

const feedSchema = mongoose.Schema({
  user_id: {
    type: String,
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

  applicants: {
    type: [String], // Array of string values representing user IDs
  },

  eventImage: String,
});

const Feed = mongoose.model("feed", feedSchema);

module.exports = Feed;

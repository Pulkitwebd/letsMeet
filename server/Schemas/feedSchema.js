const mongoose = require("mongoose");

const feedSchema = mongoose.Schema({
  user_id: {
    type: String,
  },

  postingDate: {
    type: Date,
  },

  meetDate: {
    type: Date,
  },

  locationOfMeet: {
    type: String,
  },

  currentUserLocation: {
    type: String,
  },
  city: {
    type: String,
  },

  personNeeded: {
    Type: Number,
  },

  category: {
    type: String,
  },
});

const Feed = mongoose.model("feed", feedSchema);

module.exports = Feed;

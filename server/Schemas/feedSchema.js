const mongoose = require("mongoose");

const feedSchema = mongoose.Schema({
  user_id: {
    type: String,
  },

  postingDate: {
    type: String,
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

  organiserName: {
    type: String,
  },
});

const Feed = mongoose.model("feed", feedSchema);

module.exports = Feed;

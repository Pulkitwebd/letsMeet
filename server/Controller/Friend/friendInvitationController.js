const postInvite = require("./postInvite.js");
const getAllPendingFriendRequest = require("./getAllPendingFriendRequest.js")
const getAllUpcomingPendingFriendRequest = require("./getAllUpcomingPendingFriendRequest.js")
const rejectFriendInvitation = require("./rejectFriendInvitation.js")
const acceptFriendInvitation = require("./acceptFriendInvitation.js")

module.exports = {
  postInvite,
  getAllPendingFriendRequest,
  getAllUpcomingPendingFriendRequest,
  rejectFriendInvitation,
  acceptFriendInvitation
};

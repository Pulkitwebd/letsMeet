const FriendInvitation = require("../../Schemas/friendInvitation.js");
const User = require("../../Schemas/user.js");
const friendsUpdates = require("../../socketHandler/updates/friend.js");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { _id, email } = req.user;

  if (email.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    email: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `This ${targetMailAddress} has not been found. Please check email adddress`
      );
  }

  //check if friend request has been already sent
  const invitationAlreadySent = await FriendInvitation.findOne({
    senderId: _id,
    receiverId: targetUser._id,
  });

  if (invitationAlreadySent) {
    return res.status(409).send("Invitation has been already sent");
  }

  // 👉 Check if a friend request has been already received from the target user
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: targetUser._id,
    receiverId: _id,
  });

  if (invitationAlreadyReceived) {
    return res
      .status(409)
      .send("You have already received a request from this user");
  }

  //check if the user which we would like to invite is already friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === _id.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends List");
  }

  //create new invitation
  const newInvitation = await FriendInvitation.create({
    senderId: _id,
    receiverId: targetUser._id,
  });

  // if invitation has been successfully sent we would like to update friend invitation if user is already online.

  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res
    .status(201)
    .send({ message: "Invitation has been sent", newInvitation });
};

module.exports = postInvite;

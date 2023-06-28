const FriendInvitation = require("../../Schemas/friendInvitation");
const User = require("../../Schemas/user");
const friendUpdates = require("../../socketHandler/updates/friend")

const acceptFriendInvitayion = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("Error occured.Please try again");
    }

    const { senderId, receiverId } = invitation;

    //add friends to both users
    const senderUser = await User.findById(senderId);

    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId]


    await senderUser.save();
    await receiverUser.save();

    //delete invitaion  
    await FriendInvitation.findByIdAndDelete(id);

    //update list of the friend if the user are online
    
    //update list of pending friends pending inviation
    friendUpdates.updateFriendsPendingInvitations(receiverId);

    return res.status(200).send("Friend successfully added")

  } catch (error) {
    console.log(error);
    res.status(500).send("Some went wrong. Please try again");
  }
};

module.exports = acceptFriendInvitayion;

const FriendInvitation = require("../../Schemas/friendInvitation");
const friendUpdates = require("../../socketHandler/updates/friend")

const rejectFriendInvitayion = async (req, res) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;

    //remove that invitation friend invitaion collection
    const invitationExists = await FriendInvitation.exists({
      _id: id,
    });

    
    if(invitationExists){
        await FriendInvitation.findByIdAndDelete(id);
    }

    //update pending Invitations
    friendUpdates.updateFriendsPendingInvitations(_id)

    return res.status(200).send("Invitation successfully rejected");

  } catch (error) {
    return res.status(500).send("Something went wrong please try again");
  }
};

module.exports = rejectFriendInvitayion;

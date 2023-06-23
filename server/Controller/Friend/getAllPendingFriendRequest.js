const FriendInvitation = require("../../Schemas/friendInvitation");

const getAllPendingFriendRequest = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Find all friend invitations with the given user_id as the senderId
    const friendInvitations = await FriendInvitation.find({ senderId: user_id })
      .populate("receiverId", "email firstname lastname");

    // Extract the populated receiver information from each friend invitation
    const pendingRequests = friendInvitations.map(invitation => {
      const { email, firstname, lastname} = invitation.receiverId;
      return { email, firstname, lastname };
    });

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: "Failed to get pending friend requests." });
  }
};

module.exports = getAllPendingFriendRequest;

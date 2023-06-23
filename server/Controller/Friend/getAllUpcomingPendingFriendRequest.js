const FriendInvitation = require("../../Schemas/friendInvitation");

const getAllUpcomingPendingFriendRequest = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Find all upcoming friend invitations which are received by user_id 
    const upcomingFriendInvitations = await FriendInvitation.find({ receiverId: user_id })
      .populate("senderId", "email firstname lastname");

    // Extract the populated receiver information from each friend invitation
    const upcomingRequest = upcomingFriendInvitations.map(invitation => {
      const { email, firstname, lastname} = invitation.senderId;
      return { email, firstname, lastname };
    });

    res.json(upcomingRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to get pending friend requests." });
  }
};

module.exports = getAllUpcomingPendingFriendRequest;

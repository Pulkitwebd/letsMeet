import axios from "axios";
import { currentlyInUseServer } from "../../api";

const FetchingAllPendingFriendRequest = `${currentlyInUseServer}api/friend-invitation/getAllPendingFriendRequest`;
// const ACCEPT_FRIEND_INVITATIONS = "";
// const REJECT_FRIEND_INVITATIONS = "";

// person to whom user send request
const fetchingAllPendingFriendRequest = async (data) => {
  try {
    const response = await axios.get(
      `${FetchingAllPendingFriendRequest}/${data.senderId}`,
      {
        headers: {
          authorization: `${data.token}`,
        },
      }
    );

    if (response.status === 200) {
      // Remove the previous value of receiverPendingInvitaion from localStorage
      localStorage.removeItem("receiverPendingInvitaion");

      // Add the received objects to the pendingFriendsInvitations array
      const receiverPendingInvitaion = [...response.data];

      // Store the updated pendingFriendsInvitations array in localStorage
      localStorage.setItem(
        "receiverPendingInvitaion",
        JSON.stringify(receiverPendingInvitaion)
      );

      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// const acceptFriendInvitation = async (data) => {
//   const response = await axios.post(ACCEPT_FRIEND_INVITATIONS, data);

//   if (response.data) {
//     console.log(response.data);
//   }
//   return response.data;
// };

// const rejectFriendInvitation = async (data) => {
//   const response = await axios.post(REJECT_FRIEND_INVITATIONS, data);
//   console.log(response);
// //   return user;
// };

const FriendService = {
  fetchingAllPendingFriendRequest,
  // acceptFriendInvitation,
  // rejectFriendInvitation,
};

export default FriendService;

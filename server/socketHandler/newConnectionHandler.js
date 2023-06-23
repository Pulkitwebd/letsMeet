const serverStore = require("../serverStore")
const friendsUpdate = require("../socketHandler/updates/friend");

const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId : socket.id,
        userId : userDetails._id
    })

    console.log("userDetails.userId", userDetails)
    friendsUpdate.updateFriendsPendingInvitations(userDetails._id);
}

module.exports = newConnectionHandler;
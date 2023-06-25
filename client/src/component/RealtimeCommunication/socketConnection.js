import io from "socket.io-client";
import { updatePendingInvitations } from "../../Redux/Friends/friendSlice";
import store from "../../Redux/Store";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://localhost:3001", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    
    store.dispatch(updatePendingInvitations(pendingInvitations));
  });
};

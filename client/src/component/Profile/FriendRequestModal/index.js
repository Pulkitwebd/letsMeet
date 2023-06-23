import React, { useEffect } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";


// import { sendFriendInvitation, upcomingFriendInvitation } from "../../../Redux/Friends/friendSlice";
import classes from "./index.module.css";

const FriendRequestModal = (props) => {
  const { receiverPendingInvitaion, pendingFriendsInvitations } = useSelector(
    (state) => state.friend
  );

  // const dispatch = useDispatch();

  
  // useEffect(() => {
  //   // Fetch initial data when the modal mounts
  //   dispatch(sendFriendInvitation());
  //   dispatch(upcomingFriendInvitation());
  // }, [dispatch]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "500px",
      padding: "10px",
    },
  };

  return (
    <Modal
      isOpen={props.showFriendRequestModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className={classes.buttonDiv}>
        <button onClick={props.toggleFriendRequestsModal}>Close</button>
      </div>

      <span className={classes.heading}>Friend Requests</span>
      <div className={classes.friendRequetsDivCover}>
        {receiverPendingInvitaion.map((data) => {
          return (
            <div className={classes.friendRequetsDiv}>
              <div className={classes.logo_fullname_email_cover}>
                <div className={classes.logoDiv}></div>
                <div className={classes.fullname_email}>
                  <div>
                    {data.firstname} {data.lastname}
                  </div>
                  <div>{data.email}</div>
                </div>
              </div>
              <div className={classes.status}>Pending</div>
            </div>
          );
        })}
        {pendingFriendsInvitations.map((data) => {
          return (
            <div className={classes.friendRequetsDiv}>
              <div className={classes.logo_fullname_email_cover}>
                <div className={classes.logoDiv}></div>
                <div className={classes.fullname_email}>
                  <div>
                    {data.senderId.firstname} {data.senderId.lastname}
                  </div>
                  <div>{data.senderId.email}</div>
                </div>
              </div>
              <div className={classes.accept_rejectBox}>
                <div>
                  Accept <BsFillHandThumbsUpFill />
                </div>
                <div>
                  Reject <BsFillHandThumbsDownFill />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default FriendRequestModal;

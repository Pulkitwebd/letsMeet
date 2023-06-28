import React, { useState, useEffect } from "react";
import { GoThumbsup, GoThumbsdown, GoClock } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { sendFriendInvitation } from "../../Redux/Friends/friendSlice";
import loading from "../Assets/loading.gif";
import classes from "./Profile.module.css";
import HorizontalCards from "../Shared/HorizontalCards/index";
import "react-toastify/dist/ReactToastify.css";
import userDummyImage from "../Assets/userDummyImage.webp";
import FriendRequestModal from "./FriendRequestModal/index";
import UpdateProfile from "./UpdateProfile/index.jsx";
import PhotoModal from "./PhotoModal/index";
import { currentlyInUseServer } from "../../api";

const getEventOfUser = (userId) => {
  return axios.get(
    `${currentlyInUseServer}api/auth/userInfoWithEvents/${userId}`
  );
};

const Profile = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState();
  const { user } = useSelector((state) => state.auth);

  const [showToast, setShowToast] = useState(false);

  const [photoModalStatus, setPhotoModalStatus] = useState(false);
  const [showFriendRequestModal, setShowFriendRequestModal] = useState(false);
  const [profileUpdateModal, setProfileUpdateModal] = useState(false);

  const togglePhototModal = () => {
    setPhotoModalStatus(!photoModalStatus);
  };

  const toggleFriendRequestsModal = () => {
    setShowFriendRequestModal(!showFriendRequestModal);
  };

  useEffect(() => {
    // getting user id from path
    const pathName = window.location.pathname;
    const gettingUserIdFromPath = pathName.split("/")[2];
    setUserId(gettingUserIdFromPath);
  }, [window.location.pathname]);

  const { isLoading, data } = useQuery(["getAppliedEvents", userId], () =>
    userId ? getEventOfUser(userId) : null
  );

  const openProfileUpdateModal = () => {
    setProfileUpdateModal((currentValue) => !currentValue);
  };

  const sendFriendRequest = async () => {
    if (data) {
      const sendingFriendRequestData = {
        targetMailAddress: data.data.email,
      };

      try {
        const response = await axios.post(
          `${currentlyInUseServer}api/friend-invitation/invite`,
          sendingFriendRequestData,
          {
            headers: {
              authorization: user && user.token,
            },
          }
        );

        if (response.status === 201) {
          const fetchingUpdatedAllPendingFriendRequest = {
            senderId: user && user.user._id,
            token: user && user.token,
          };

          dispatch(
            sendFriendInvitation(fetchingUpdatedAllPendingFriendRequest)
          );

          setShowToast(true);
          toast.error(response.data.message, {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
      } catch (error) {
        if (error.response.status === 409) {
          setShowToast(true);
          toast.error(error.response.data, {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
        console.error("Error sending friend request: ", error);
      }
    }
  };

  return (
    <div>
      {showToast && <ToastContainer />}
      <PhotoModal
        photoModalStatus={photoModalStatus}
        togglePhotoModal={togglePhototModal}
      />
      <FriendRequestModal
        showFriendRequestModal={showFriendRequestModal}
        toggleFriendRequestsModal={toggleFriendRequestsModal}
      />
      <UpdateProfile
        showModal={profileUpdateModal}
        toggalProfileModal={openProfileUpdateModal}
      />
      <div className={classes.userPhotoDesc}>
        <div className={classes.userPhotoDiv}>
          <img
            alt="user"
            src={data && data.data ? data.data.photo : userDummyImage}
            className={classes.userPhoto}
          ></img>
          {user && user.user && user.user._id === userId && (
            <div className={classes.editImage} onClick={togglePhototModal}>
              {<AiFillEdit />}
            </div>
          )}
        </div>
        <div className={classes.userDescription}>
          <div className={classes.userName}>
            <h1>
              {data && data.data.firstname} {data && data.data.lastname}
            </h1>
          </div>
          <div className={classes.userDetails}>
            "Hi there! I'm a passionate event manager for a local cricket club,
            responsible for planning and executing a range of events and
            activities that bring our community of players, fans, and supporters
            together. With my keen eye for detail and exceptional organizational
            skills, I ensure that every event is a success - from match-day
            experiences and fan engagements, to fundraising events and social
            gatherings.
          </div>
        </div>
        {user && data && user.user && user.user._id === data.data._id && (
          <div className={classes.buttonCover}>
            <button onClick={openProfileUpdateModal}>
              Edit Profile
              <AiFillEdit style={{ fontSize: "20" }} />
            </button>
            <button onClick={toggleFriendRequestsModal}>
              Friend Requests Status
            </button>
          </div>
        )}
        {user && data && user.user && user.user._id !== data.data._id && (
          <div className={classes.buttonCover}>
            <button onClick={sendFriendRequest}>
              Add Frined
              <FaUserFriends style={{ fontSize: "30" }} />
            </button>
          </div>
        )}
      </div>

      <div className={classes.userActivity}>
        <div className={classes.totalDetails}>
          <div className={classes.totallogo}>
            <GoThumbsup />
          </div>
          <div className={classes.totalNumber}>
            <div>0 Likes</div>
            <div>Total up votes</div>
          </div>
        </div>

        <div className={classes.totalDetails}>
          <div className={classes.totallogo}>
            <GoThumbsdown />
          </div>
          <div className={classes.totalNumber}>
            <div>0 Dislikes</div>
            <div>Total down votes</div>
          </div>
        </div>

        <div className={classes.totalDetails}>
          <div className={classes.totallogo}>
            <GoClock />
          </div>
          <div className={classes.totalNumber}>
            <div>1 day ago</div>
            <div>Last Activity</div>
          </div>
        </div>
      </div>

      <div className={classes.RecentPost_RecentComments_EditAccount}>
        <div className={classes.activeDiv}>All Events</div>
      </div>

      <div className={classes.eventsHorizontalDiv}>
        {isLoading && <img src={loading} alt="loading" />}
        {data && data.data.appliedEvents.length > 0 ? (
          data.data.appliedEvents.map((event, id) => {
            return <HorizontalCards event={event} />;
          })
        ) : (
          <div>
            {data &&
              data.data.appliedEvents.length === 0 &&
              "User has not applied to any event yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

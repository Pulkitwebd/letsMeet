import React, { useState, useEffect, useRef } from "react";
import { GoThumbsup, GoThumbsdown, GoClock } from "react-icons/go";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import classes from "./Profile.module.css";
import HorizontalCards from "../Shared/HorizontalCards/index";
import userDummyImage from "../Assets/userDummyImage.webp";
import PhotoModal from "./PhotoModal/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [showToast, setShowToast] = useState(false);
  const [photoModalStatus, setPhotoModalStatus] = useState(false);
  const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState(userDummyImage);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(null);

  const toggleModal = (updatedData, responseFromUpdtaedApi) => {
    if (responseFromUpdtaedApi === 201) {
      setShowToast(true);
      toast.success("Photo is updated successfully!", {
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        autoClose: 2000,
      });
      setUpdatedProfilePhoto(updatedData.photo);
    }
    setPhotoModalStatus(!photoModalStatus);
  };

  const openModal = () => {
    return setPhotoModalStatus(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `/api/auth/getUserById/${user.user._id}`
      );
      setUpdatedProfilePhoto(data.user.photo || userDummyImage);
      setIsImageLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      axios.CancelToken.source().cancel();
    };
  }, []);

  return (
    <div>
      {showToast && <ToastContainer />}
      <PhotoModal
        photoModalStatus={photoModalStatus}
        togglePhotoModal={toggleModal}
      />
      <div className={classes.userPhotoDesc}>
        <div className={classes.userPhotoDiv}>
          {isImageLoaded ? (
            <img
              alt="user"
              src={updatedProfilePhoto}
              className={classes.userPhoto}
              ref={imgRef}
            />
          ) : null}
          {/* {updatedProfilePhoto ? ( // Check if updatedProfilePhoto is not null before displaying the image
            <img
              alt="user image"
              src={updatedProfilePhoto}
              className={classes.userPhoto}
            ></img>
          ) : (
            
            <div className={classes.loadingSpinner}>Loading...</div> 
          )} */}
          {/* <img
            alt="user image"
            src={updatedProfilePhoto}
            className={classes.userPhoto}
          ></img> */}
          <div className={classes.editImage} onClick={openModal}>
            <AiFillEdit />
          </div>
        </div>
        <div className={classes.userDescription}>
          <div className={classes.userName}>
            <h1>
              {user.user.firstname} {user.user.lastname}
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
      </div>

      <div className={classes.TotalPostUserLikes}>
        <div></div>
        <div></div>
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
        <div>Edit Account</div>
      </div>

      <div className={classes.eventsHorizontalDiv}>
        <HorizontalCards />
        <HorizontalCards />
      </div>
    </div>
  );
};

export default Profile;

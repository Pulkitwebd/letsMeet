import React from "react";
import userPhoto from "../Assets/userPhoto.jpg";
import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <div>
      <div className={classes.userPhotoDesc}>
        <div className={classes.userPhotoDiv}>
          <img
            alt="user image"
            src={userPhoto}
            className={classes.userPhoto}
          ></img>
        </div>
        <div className={classes.userDescription}>
          <div className={classes.userName}>
            <h1>Pulkit</h1>
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

      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>

      <div></div>
    </div>
  );
};

export default Profile;

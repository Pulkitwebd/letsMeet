import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { FiMoreVertical } from "react-icons/fi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import axios from "axios";

const Card = React.memo(({ event }) => {
  const { user } = useSelector((state) => state.auth);
  const [showList, setShowList] = useState(false);
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    if (user !== null && user.user._id == event.user_id) {
      setShowThreeDots(true);
    } else {
      setShowThreeDots(false);
    }

    axios
      .get(`/api/auth/getUserById/${event.user_id}`)
      .then((response) => {
        setUserPhoto(response.data.user.photo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, event]);

  useEffect(() => {
    let image = new Image();
    image.src = event.eventImage;
    image.onload = () => setImageSrc(event.eventImage);
  }, [event.eventImage]);

  const navigate = useNavigate();

  const handleShowList = () => setShowList(!showList);

  const handleParticularEventPage = () => navigate(`/event/${event._id}`);

  const description = event.desc.charAt(0).toUpperCase() + event.desc.slice(1);

  let date = event.meetDate;
  let startIndex = date.indexOf("T") + 1;
  let endIndex = date.indexOf(".");
  let requiredTimeFormat = date.substring(startIndex, endIndex);

  let dateString = event.meetDate;
  let requiredSring = dateString.split(" ")[0];
  let date1 = new Date(requiredSring);
  let options = { weekday: "short", month: "short", day: "2-digit" };
  let requiredDateFormat = date1.toLocaleDateString("en-US", options);

  return (
    <div className={classes.card}>
      <div className={classes.threeDots}>
        {showThreeDots && <FiMoreVertical onClick={handleShowList} />}
      </div>
      {showList && showThreeDots && (
        <div className={classes.list}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DeleteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </div>
      )}
      <div className={classes.placePhoto}>
        {imageSrc ? (
          <img src={imageSrc} alt="Event Image" />
        ) : (
          <div>Loading image...</div>
        )}
      </div>
      <div className={classes.organiserPhoto}>
        {userPhoto && <img alt="event organiser" src={userPhoto}></img>}
      </div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>{event.organiserName}</div>
        <div className={classes.title}>{event.title}</div>
        <div
          className={classes.meetDate}
        >{`${requiredDateFormat} ${requiredTimeFormat}`}</div>
        <div className={classes.EventDesc}>{description}</div>
        <div>Person Needed : {event.personNeeded}</div>
        <button
          onClick={handleParticularEventPage}
          className={classes.showMoreBtn}
        >
          Show more
        </button>
      </div>
    </div>
  );
});

export default Card;

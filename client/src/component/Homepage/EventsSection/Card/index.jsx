import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import DeleteIcon from "@mui/icons-material/Delete";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./Card.module.css";

const Card = React.memo(({ event, callApiOnDeleteCard, index }) => {
  const { user } = useSelector((state) => state.auth);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [showToast, setShowToast] = useState(false);

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

  const handleShowList = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const handleDeleteEventApi = () => {
    axios
      .delete("/api/feed/event", {
        data: {
          eventId: event._id,
          user_id: user.user._id,
        },
      })
      .then((resp) => {
        if ((resp.status = 200)) {
          callApiOnDeleteCard();
          setShowDeleteButton(false);
          setShowToast(true);
          toast.error("Event is deleted! Successfully", {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleParticularEventPage = () =>
    navigate(`/event/${event._id}`, { state: { userPhoto } });

  const description = event && event.desc ? event.desc.charAt(0).toUpperCase() + event.desc.slice(1) : "";

  let date = event && event.meetDate ? event.meetDate : "";
  let startIndex = date && date.indexOf("T") + 1;
  let endIndex = date && date.indexOf(".");
  let requiredTimeFormat = date && date.substring(startIndex, endIndex);

  let dateString = event && event.meetDate ? event.meetDate : "";
  let requiredSring = dateString && dateString.split(" ")[0];
  let date1 = new Date(requiredSring);
  let options = { weekday: "short", month: "short", day: "2-digit" };
  let requiredDateFormat = date1.toLocaleDateString("en-US", options);

  return (
    <div className={classes.card}>
      {showToast ? <ToastContainer /> : ""}
      <div className={classes.threeDots}>
        {showThreeDots && <FiMoreVertical onClick={handleShowList} />}
      </div>
      {showDeleteButton && (
        <div
          className={classes.deleteEventButton}
          onClick={handleDeleteEventApi}
        >
          {/* <DeleteIcon /> Delete */}
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

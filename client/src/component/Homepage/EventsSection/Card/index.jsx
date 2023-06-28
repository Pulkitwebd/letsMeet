import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import DeleteIcon from "@mui/icons-material/Delete";
import { FiMoreVertical } from "react-icons/fi";
import { BsFillShareFill, BsFillBookmarkFill, BsWhatsapp, BsTwitter, BsPinterest } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./Card.module.css";
import { currentlyInUseServer } from "../../../../api";

const Card = React.memo(({ event, callApiOnDeleteCard, index }) => {
  const { user } = useSelector((state) => state.auth);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showThreeDots, setShowThreeDots] = useState(false);
  const [showSocialMediaIcons, toggleShowSocialMediaIcons] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  // const [userPhoto, setUserPhoto] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const userPhoto = event.user_id.photo;

  useEffect(() => {
    if (user !== null && user.user._id === event.user_id._id) {
      setShowThreeDots(true);
    } else {
      setShowThreeDots(false);
    }
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

  const shareButtonHandler = () => {
    toggleShowSocialMediaIcons(!showSocialMediaIcons);
  };

  const bookmarkEvent = () => {
    console.log(" bookmarkEvent button");
  };

  const shareOnSocialMedia = (SocialMediaType) => {
    if(SocialMediaType==='whatsapp'){
      const message = "Your message goes here";
      const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }

    else if(SocialMediaType==='twitter'){
      const url = encodeURIComponent(window.location.href);
      const text = "Your tweet goes here";
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(text)}`;
      window.open(twitterUrl, "_blank");
    }
    
    else if (SocialMediaType === 'pinterest') {
      const url = encodeURIComponent(window.location.href);
      const mediaUrl = "URL of the image you want to include";
      const description = "Your description goes here";
      const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${encodeURIComponent(mediaUrl)}&description=${encodeURIComponent(description)}`;
      window.open(pinterestUrl, "_blank");
    }
    toggleShowSocialMediaIcons(!showSocialMediaIcons);
  };
  
  const handleDeleteEventApi = () => {
    axios
      .delete(`${currentlyInUseServer}api/feed/event`, {
        data: {
          eventId: event._id,
        },
        headers: {
          authorization: user && user.token,
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

  const description = event && event.desc ? event.desc : "";
  const truncatedDescription = description
    .replace(/(<([^>]+)>)/gi, "")
    .split(" ")
    .slice(0, 10)
    .join(" ");

  const truncatedDescriptionWithEllipsis =
    description.length > 50
      ? truncatedDescription + "..."
      : truncatedDescription;

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
          <img src={imageSrc} alt="Event" />
        ) : (
          <div>Loading image...</div>
        )}

        <button className={classes.shareButton} onClick={shareButtonHandler}>  {<BsFillShareFill/>}  </button>
          { showSocialMediaIcons &&
            <>  <button className={classes.whatsappButton} onClick={() => shareOnSocialMedia('whatsapp') }> <BsWhatsapp /> </button>
                <button className={classes.twitterButton} onClick={() => shareOnSocialMedia('twitter') }> <BsTwitter /> </button>
                <button className={classes.pinterestButton} onClick={() => shareOnSocialMedia('pinterest') }> <BsPinterest /> </button>
            </>
          }
        <button className={classes.bookmarkButton}  onClick={bookmarkEvent} > {<BsFillBookmarkFill />} </button>

      </div>
      <div className={classes.organiserPhoto}>
        <img alt="event organiser" src={userPhoto}></img>
      </div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>{event.organiserName}</div>
        <div className={classes.title}>{event.title}</div>
        <div
          className={classes.meetDate}
        >{`${requiredDateFormat} ${requiredTimeFormat}`}</div>
        <div className={classes.EventDesc}>
          <div
            className={classes.eventDetailsPara}
            dangerouslySetInnerHTML={{
              __html: truncatedDescriptionWithEllipsis,
            }}
          ></div>
        </div>
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
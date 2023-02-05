import React from "react";
import classes from "../Homepage.module.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const handleParticularEventPage = () => {
    navigate(`/event/${props.event._id}`);
  };

  const description =
    props.event.desc.charAt(0).toUpperCase() + props.event.desc.slice(1);

  return (
    <div className={classes.card}>
      <div className={classes.placePhoto}>
        <img src={props.event.eventImage} alt="Event Image" />
      </div>
      <div className={classes.organiserPhoto}></div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>{props.event.organiserName}</div>
        <div className={classes.EventDesc}>{description}</div>
        <div>Person Needed : {props.event.personNeeded}</div>
        <button onClick={handleParticularEventPage}>Show more</button>
      </div>
    </div>
  );
};

export default Card;

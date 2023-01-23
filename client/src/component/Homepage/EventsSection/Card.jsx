import React from "react";
import classes from "../Homepage.module.css";

const Card = (props) => {
  
  console.log(props.event)
  return (
    <div className={classes.card}>
      <div className={classes.placePhoto}></div>
      <div className={classes.organiserPhoto}></div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>{props.event.organiserName}</div>
        <div className={classes.EventDesc}>
         {props.event.personNeeded}
        </div>
      </div>
    </div>
  );
};

export default Card;

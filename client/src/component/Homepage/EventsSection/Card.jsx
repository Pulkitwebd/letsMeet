import React from "react";
import classes from "../Homepage.module.css";

const Card = (props) => {
  
  return (
    <div className={classes.card}>
      <div className={classes.placePhoto}></div>
      <div className={classes.organiserPhoto}></div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>{props.pulkit.organiserName}</div>
        <div className={classes.EventDesc}>
          {props.pulkit.desc} 
        </div>
      </div>
    </div>
  );
};

export default Card;

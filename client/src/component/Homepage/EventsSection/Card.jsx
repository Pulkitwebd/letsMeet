import React from "react";
import classes from "../Homepage.module.css";

const Card = () => {
  return (
    <div className={classes.card}>
      <div className={classes.placePhoto}></div>
      <div className={classes.organiserPhoto}></div>
      <div className={classes.EventInfo}>
        <div className={classes.OrganiserName}>Organiser Name</div>
        <div className={classes.EventDesc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum 
        </div>
      </div>
    </div>
  );
};

export default Card;

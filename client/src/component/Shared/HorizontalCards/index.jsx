import React from "react";
import classes from "./HorizontalCards.module.css";

const HorizontalCards = ({ event, callApiOnDeleteCard, index }) => {
  return (
    <div className={classes.horizontalCardsMainBox}>
      <div className={classes.cardsImgBox}>
        <img src={event.eventImage} alt="event"></img>
      </div>

      <div className={classes.cardsDetailsBox}>
        <div className={classes.dateOfEvent}>
          <h3>Event Date: {event.meetDate.slice(0, 10)}</h3>
          <h3>Time : {event.meetDate.slice(11, 19)}</h3>
        </div>
        <h2 className={classes.title}>{event.title}</h2>
        <div className={classes.description}>{event.desc}</div>

        <div className={classes.colourTagDiv}>
          <div className={classes.eventMode}>
            <h4>Event Mode</h4>
            <button className={classes.eventModeButton}>Online</button>
          </div>

          <div className={classes.eventMode}>
            <h4>Person Needed</h4>
            <div className={classes.personNeeded}>{event.personNeeded}</div>
          </div>

          <div className={classes.eventMode}>
            <h4>Event Status</h4>
            <div className={classes.eventCompletePendingButton}>Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;

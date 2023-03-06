import React from "react";
import classes from "./HorizontalCards.module.css";
import dummyEventImg from "../../Assets/dummyEventImg.jpg";

const HorizontalCards = () => {
  return (
    <div className={classes.horizontalCardsMainBox}>
    
      <div className={classes.cardsImgBox}>
        <img src={dummyEventImg} alt="event image"></img>
      </div>

      <div className={classes.cardsDetailsBox}>
        <div className={classes.dateOfEvent}>Fri, May 12 22:53:00</div>
        <h2 className={classes.title}>Indore Cricket club</h2>
        <div className={classes.description}>
          Join us for an exciting day of cricket action! Our local cricket club
          is hosting a match between two of the best teams in the league, and
          you won't want to miss out. From the moment you arrive, you'll be
          immersed in the atmosphere of this great sport, surrounded by
          passionate fans and players.
        </div>

        <div className={classes.colourTagDiv}>
          <div className={classes.eventMode}>
            <h4>Event Mode</h4>
            <button className={classes.eventModeButton}>Online</button>
          </div>

          <div className={classes.eventMode}>
            <h4>Person Needed</h4>
            <div className={classes.personNeeded}>7</div>
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

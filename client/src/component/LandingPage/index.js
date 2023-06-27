import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import classes from "./index.module.css";
import sideimage from "../Assets/Landing/80704-meeting.png";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <h1 className={classes.h1}>
              THE <span className={classes.header}>PLATFORM-</span> <br></br>
              WHERE YOU CAN INTERACT WITH THE WORLD !{" "}
            </h1>
            <button className={classes.btn} onClick={() => navigate("/home")}>Explore Events</button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img alt="slider" src={sideimage} className={classes.img_preview} /> 
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;

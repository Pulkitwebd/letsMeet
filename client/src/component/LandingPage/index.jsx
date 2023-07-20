import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import classes from "./index.module.css";
import sideimage from "../Assets/Landing/80704-meeting.png";
import bgellipse from "../Assets/Landing/home_ellipse.png";
import event1 from "../Assets/Landing/event1.jpeg";
import event2 from "../Assets/Landing/event2.jpg";
import communicate from "../Assets/communicate.gif";
import collaboration from "../Assets/collaboration.gif";
import growth from "../Assets/growth.gif";

// Slider Imports
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard } from "swiper/core";
// import required modules
import { Autoplay, Pagination } from "swiper";
SwiperCore.use([Keyboard, Autoplay]);



const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.container}>
      
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <h1 className={classes.h1}>
              THE <span className={classes.header}>PLATFORM-</span> <br></br>
              WHERE YOU CAN INTERACT <span className={classes.sm_break}>WITH THE WORLD</span> !{" "}
            </h1>
            <button className={classes.btn} onClick={() => navigate("/home")}>Explore Events</button>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img alt="background Ellipse" src={bgellipse} className={classes.bg_preview} /> 
            <img alt="slider" src={sideimage} className={classes.img_preview} /> 
          </Grid>
        </Grid>

      
      </div>

      {/* Trending Events */}
      <div className={classes.events}>
        <div className={classes.path}></div>
        <h2>TRENDING EVENTS</h2>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6} lg={6}>
            <img alt="Events 1" src={event1} className={classes.event_thumbnail}/> 
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <img alt="Events 2" src={event2} className={classes.event_thumbnail}/> 
          </Grid>
        </Grid>
      </div>

      {/* Community Slider */}
      <div className={classes.community}>
        
        <Grid container >
        <h2>JOIN COMMUNITY</h2>

          <Grid item xs={12} md={12} lg={12}>
            {/* <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
              keyboard={{ enabled: true }}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
            > */}
              {/* <SwiperSlide>
                <img src={growth} alt="Hello gif" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={collaboration} alt="Hello gif" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={communicate} alt="Hello gif" />
              </SwiperSlide>
            </Swiper> */}
          </Grid>
        </Grid>

      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import classes from "./Signup.module.css";
import SignupForm from "./SignupForm";
import communicate from "../Assets/communicate.gif";
import collaboration from "../Assets/collaboration.gif";
import growth from "../Assets/growth.gif";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard } from "swiper/core";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
SwiperCore.use([Keyboard, Autoplay]);

const Signup = () => {
  return (
    <div className={classes.signup_page}>
      <div className={classes.rightCircle} />
      <div className={classes.mainSignupBox}>
        <div className={classes.picture}>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper"
            keyboard={{ enabled: true }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <img src={growth} alt="Hello gif" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={collaboration} alt="Hello gif" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={communicate} alt="Hello gif" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className={classes.formMainBox}>
          <h1 className={classes.getStarted}>Get Started</h1>
          <p className={classes.alreadyAccount}>
            Already have account? <Link to="/Signin"><span>Sign in</span></Link>
          </p>

          <div className={classes.formCover}>
            <SignupForm />
          </div>
        </div>
      </div>

      <div className={classes.leftCircle} />
    </div>
  );
};

export default Signup;
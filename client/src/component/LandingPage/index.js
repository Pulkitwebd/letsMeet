import React from 'react'
import classes from './index.module.css';

import sideimage from "../assets/Landing/80704-metting.png";

const LandingPage = () => {
  console.log(sideimage);
  return (
    <div>
        <div className={classes.container}>
        <h1 className={classes.h1}>THE <span className={classes.header}>PLATFORM-</span> <br></br>WHERE YOU CAN INTERACT WITH THE WORLD ! </h1>
            <button className={classes.btn}>Explore Events</button>
            {/* <img src={process.env.PUBLIC_URL + sideimage} /> */}
        </div>
    </div>
  )
}

export default LandingPage
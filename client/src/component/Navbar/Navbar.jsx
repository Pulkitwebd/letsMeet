import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <img src=""></img>
      </div>

      <div className={classes.navlinks}>
        <div className={classes.link}>
          <Link to="/">Home</Link>
        </div>
        <div className={classes.link}>
          <Link to="/message">Messages</Link>
        </div>
        <div className={classes.link}>
          <Link to="/profile">Profile</Link>
        </div>
      </div>

      <div className={classes.loginSignup_box}>
        {/* when user logged in show logout button instead of sign in */}
        <div>
          <Link to="/Signin">SignIn</Link>
        </div>
        {/* when user logged in show user name instead og signup */}
        <div>
          <Link to="/Signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

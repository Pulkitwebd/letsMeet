import React from "react";
import classes from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../Redux/Auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    window.alert("Logout successfully");
    navigate("/");
  };

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
      {user ? (
        <div className={classes.loginSignup_box}>
          <div onClick={onLogout}>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      ) : (
        <div className={classes.loginSignup_box}>
          <div>
            <Link to="/Signin">SignIn</Link>
          </div>
          <div>
            <Link to="/Signup">SignUp</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

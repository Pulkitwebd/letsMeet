import React from "react";
import classes from "./Navbar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../Redux/Auth/authSlice";
import { BsList } from "react-icons/bs";
import logoutImg from "../Assets/logout.png";
import profile from "../Assets/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;

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

      <div className={classes.hambergerMenu}>
        <BsList />
      </div>

      <div className={classes.navlinks}>
        <div className={classes.link}>
          <NavLink
            to="/"
            className={`${pathname === "/" ? classes.active : classes.link}`}
          >
            Home
          </NavLink>
        </div>
        <div className={classes.link}>
          <NavLink
            to="/message"
            className={`${
              pathname === "/message" ? classes.active : classes.link
            }`}
          >
            Messages
          </NavLink>
        </div>
        <div className={classes.link}>
          <NavLink
            to="/blog"
            className={`${
              pathname === "/blog" ? classes.active : classes.link
            }`}
          >
            Blogs
          </NavLink>
        </div>
      </div>
      {user ? (
        <div className={classes.logout_box}>
          <div className={classes.link}>
            <NavLink
              to="/profile"
              className={`${
                pathname === "/profile" ? classes.active : classes.link
              }`}
            >
              <div className={classes.profile}>
                <img src={profile} alt="profile" />
              </div>
            </NavLink>
          </div>
          <div onClick={onLogout}>
            <NavLink
              to="/logout"
              className={`${
                pathname === "/logout" ? classes.active : classes.link
              }`}
            >
              Logout
            </NavLink>
            <img
              src={logoutImg}
              alt="logout"
              className={classes.logoutImg}
              onClick={onLogout}
            ></img>
          </div>
        </div>
      ) : (
        <div className={classes.loginSignup_box}>
          <div>
            <NavLink
              to="/signin"
              className={`${
                pathname === "/signin" ? classes.active : classes.link
              }`}
            >
              SignIn
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/signup"
              className={`${
                pathname === "/signup" ? classes.active : classes.link
              }`}
            >
              SignUp
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { BsList } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import {
  AiFillHome,
  AiOutlinePlusCircle,
  AiOutlineLogin,
} from "react-icons/ai";

import { logout, reset } from "../../Redux/Auth/authSlice";
import EventModal from "../Homepage/Modal/CreateEventModal";
import classes from "./Navbar.module.css";
import logoutImg from "../Assets/logout.png";
import profile from "../Assets/profile.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const [showModal, setShowModal] = useState(false);

  const isMobileScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setShowToast(true);
    toast.success("User Logout Successfully", {
      closeOnClick: true,
      draggable: true,
      pauseOnHover: false,
      autoClose: 1000,
    });
    navigate("/");
  };

  const handleEventModal = () => {
    if (!user) {
      setShowToast(true);
      toast.error("Please Login to Create Event", {
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        autoClose: 3000,
      });
    } else {
      setShowModal(!showModal);
    }
  };

  return (
    <div className={classes.navbar}>
      {showToast && <ToastContainer />}

      {/* bigger than mobile screen */}
      {!isMobileScreen && (
        <>
          <div className={classes.logo}>
            <img src="" alt="logo"></img>
          </div>
          <div className={classes.hambergerMenu}>
            <BsList />
          </div>

          <div className={classes.navlinks}>
            <div className={classes.link}>
              <NavLink
                to="/"
                className={`${
                  pathname === "/" ? classes.active : classes.link
                }`}
              >
                Home
              </NavLink>
            </div>

            <div className={classes.link}>
              <NavLink
                to="/blogs"
                className={`${
                  pathname === "/blogs" ? classes.active : classes.link
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
                    <img
                      src={user.user.photo ? user.user.photo : profile}
                      alt="user"
                    />
                  </div>
                </NavLink>
              </div>

              <div className={classes.link}>
                <NavLink
                  to="/message"
                  className={`${
                    pathname === "/message"
                      ? classes.messageIconActive
                      : classes.messageIcon
                  }`}
                >
                  <FaFacebookMessenger />
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
        </>
      )}

      {/* mobile screen */}
      {isMobileScreen && (
        <div className={classes.mobileNavbar}>
          <div className={classes.homeLogo} onClick={() => navigate("/")}>
            <AiFillHome />
          </div>
          <div className={classes.plusLogo} onClick={handleEventModal}>
            {user && <EventModal showModal={showModal} />}

            <AiOutlinePlusCircle />
          </div>

          {user ? (
            <div className={classes.userPhoto}>
              <NavLink
                to="/profile"
                className={`${
                  pathname === "/profile" ? classes.active : classes.link
                }`}
              >
                <div className={classes.profile}>
                  <img
                    src={user.user.photo ? user.user.photo : profile}
                    alt="user"
                  />
                </div>
              </NavLink>
            </div>
          ) : (
            <div
              className={classes.loginButton}
              onClick={() => navigate("/signin")}
            >
              <AiOutlineLogin />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

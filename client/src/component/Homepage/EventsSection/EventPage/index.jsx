import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IoMdPin } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { currentlyInUseServer } from "../../../../api";
import "react-quill/dist/quill.snow.css";
import loading from "../../../Assets/loading.gif";
import classes from "./Event.module.css";
import profile from "../../../Assets/profile.jpg";
import CommentBox from "./CommentBox";
const getEvent = (eventId) => {
  return axios.get(`${currentlyInUseServer}api/feed/Event/${eventId}`);
};

const EventPage = () => {
  const navigate = useNavigate();
  const [eventId, setEventId] = useState();

  const { user } = useSelector((state) => state.auth);

  const [showToast, setShowToast] = useState(false);

  const { isLoading, data, isError, error, refetch } = useQuery(
    ["get-event", eventId],
    () => (eventId ? getEvent(eventId) : null)
  );

  //getting usrePhto from card index.jsx by passing in navigate
  const location = useLocation();
  const userPhoto = location.state.userPhoto || profile;

  useEffect(() => {
    const pathName = window.location.pathname;
    const eventId = pathName.split("/")[2];
    setEventId(eventId);
  }, []);

  let date = data ? data.data.meetDate : "";

  let startIndex = date.indexOf("T") + 1;
  let endIndex = date.indexOf(".");
  let requiredTimeFormat = date.substring(startIndex, endIndex);

  let dateString = data ? data.data.meetDate : "";

  let requiredSring = dateString.split(" ")[0];
  let date1 = new Date(requiredSring);
  let options = { weekday: "short", month: "short", day: "2-digit" };
  let requiredDateFormat = date1.toLocaleDateString("en-US", options);

  const handleApplyEvent = async () => {
    const applyEventData = {
      feedId: data ? data.data._id : "",
    };

    // sending post request for adding user to database in feed
    try {
      const response = await axios.post(
        `${currentlyInUseServer}api/feed/applyToEvent`,
        applyEventData,
        {
          headers: {
            authorization: user && user.token,
          },
        }
      );

      if (response.status === 200) {
        setShowToast(true);
        toast.success(response.data.message, {
          closeOnClick: true,
          draggable: true,
          pauseOnHover: false,
          autoClose: 2000,
        });

        refetch();
      }
    } catch (error) {
      if (error.response.status === 500) {
        setShowToast(true);
        toast.error("Login to Apply", {
          closeOnClick: true,
          draggable: true,
          pauseOnHover: false,
          autoClose: 2000,
        });
      }

      if (error.response.status === 400) {
        setShowToast(true);
        toast.error(error.response.data.error, {
          closeOnClick: true,
          draggable: true,
          pauseOnHover: false,
          autoClose: 2000,
        });
      }

      if (error.response.status === 403) {
        setShowToast(true);
        toast.error("Please login first", {
          closeOnClick: true,
          draggable: true,
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    }
  };

  const handleUserNavigation = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      {showToast && <ToastContainer />}
      {isLoading && (
        <div className={classes.loadingBox}>
          <img src={loading} alt="loading gif" />
        </div>
      )}
      {isError && <div>{error.message}</div>}
      {data && (
        <div>
          <div className={classes.eventHeading}>
            <div className={classes.titleApplyEventbtnCover}>
              <h1>
                TITLE -
                {data.data.title.charAt(0).toUpperCase() +
                  data.data.title.slice(1)}
              </h1>
              <button onClick={handleApplyEvent}>Apply to Event</button>
            </div>
            <div className={classes.organiserDetails}>
              <div
                className={classes.organiserPhoto}
                onClick={() => handleUserNavigation(data.data.user_id)}
              >
                <img src={userPhoto} alt="user" />
              </div>
              <div className={classes.organiserHeading_Photo}>
                <h3>Organiser</h3>
                <p>{data.data.organiserName}</p>
              </div>
            </div>
          </div>

          <div className={classes.boxBtwHeading_Details}></div>

          <div className={classes.eventDetails}>
            <div className={classes.eventAddressTimeBox}>
              <div className={classes.eventDateTime}>
                <div className={classes.timelogo}>
                  <FaClock />
                </div>
                <div>
                  {requiredDateFormat} {requiredTimeFormat}
                </div>
              </div>
              <div className={classes.eventAddress}>
                <div className={classes.addressLogo}>
                  <IoMdPin />
                </div>
                <div>
                  <div>
                    {data.data.address.landmark} {data.data.address.area}
                  </div>
                  <div>{data.data.address.city}</div>
                  <div>{data.data.address.state}</div>
                </div>
              </div>
            </div>

            <div className={classes.eventImage}>
              <img src={data.data.eventImage} alt="event"></img>
            </div>

            <div className={classes.eventDetailsParaBox}>
              <h2>Details</h2>

              <div
                className={classes.eventDetailsPara}
                dangerouslySetInnerHTML={{ __html: data.data.desc }}
              ></div>
            </div>
            <div className={classes.attendiesBox}>
              <h2>Attendies {data.data.applicants.length}</h2>
              <Grid container spacing={3}>
                {data.data.applicants.map((user, index) => {
                  return (
                    <Grid item md={4} xs={8} key={index}>
                      <div className={classes.attendiesCard}>
                        <div
                          className={classes.attendiesImgBox}
                          onClick={() => handleUserNavigation(user._id)}
                        >
                          <img
                            src={user.photo ? user.photo : profile}
                            alt="member"
                          />
                        </div>
                        <p>{`${user.firstname} ${user.lastname}`}</p>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
                        
            </div>
            <CommentBox />
          </div>
        </div>
      )}
    </>
  );
};

export default EventPage;

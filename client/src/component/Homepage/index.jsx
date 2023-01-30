import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import classes from "./Homepage.module.css";
import Category from "./FilterSection/Category";
import City from "./FilterSection/City";
import EventFromLocation from "./FilterSection/EventFromLocation";
import DateOfEvent from "./FilterSection/DateOfEvent";
import Localities from "./FilterSection/Localities";
import CreateEventModal from "./Modal/CreateEventModal";
import "react-toastify/dist/ReactToastify.css";
import Card from "./EventsSection/Card";

const Homepage = () => {
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [events, setEvents] = useState("");

  const userlocalStorage = JSON.parse(localStorage.getItem("user"));

  const { decodeToken, isExpired, reEvaluateToken } = useJwt(
    user === null || userlocalStorage === null ? null : userlocalStorage.token
  );

  const toggleModal = (createdEventStatus, createdEventData) => {
    if (user !== null) {
      reEvaluateToken(userlocalStorage.token);
      if (!isExpired) {
        setShowModal(!showModal);
        if (createdEventStatus == 201) {
          // createEventStatus is coming from modal page on successfully event creation
          setShowToast(true);
          toast.success("Event is created! Successfully", {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 2000,
          });
        }
      }
    } else {
      setShowModal(false);
      // if not login user then showing toast
      setShowToast(true);
      toast.error("Please Login To create Event", {
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/api/feed/allEvents?pageNumber=0`)
      .then((res) => {
        console.log(res.data.data.data);
        setEvents(res.data.data.data);
      })
      .catch((err) => {
        console.log("error while fetching the events", err);
      });
  }, [showToast]);

  return (
    <>
      <Grid container>
        <CreateEventModal showModal={showModal} toggleModal={toggleModal} />
        {showToast ? <ToastContainer /> : ""}
        <Grid item xs={4} md={3} lg={3}>
          <div className={classes.filterSection}>
            <Category />
            <Divider />
            <DateOfEvent />
            <Divider />
            <City />
            <Divider />
            <Localities />
            <Divider />
            <EventFromLocation />
          </div>
        </Grid>

        <Grid item xs={8} md={9} lg={9}>
          <div className={classes.eventSections}>
            <div className={classes.createEventDiv}>
              <button className={classes.createEventBtn} onClick={toggleModal}>
                Create Event
              </button>
            </div>

            <Grid container className={classes.cardGrid}>
              {events ? (
                events.map((event, id) => {
                  return (
                    <Grid item xs={8} md={4} key={id}>
                      <Card event={event} />
                    </Grid>
                  );
                })
              ) : (
                <div>Loading</div>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;

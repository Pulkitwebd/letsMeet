import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useJwt } from "react-jwt";
import classes from "./Homepage.module.css";
import Category from "./FilterSection/Category";
import City from "./FilterSection/City";
import EventFromLocation from "./FilterSection/EventFromLocation";
import DateOfEvent from "./FilterSection/DateOfEvent";
import Localities from "./FilterSection/Localities";
import Card from "./EventsSection/Card";
import CreateEventModal from "./Modal/CreateEventModal";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const { decodedToken, isExpired, reEvaluateToken  } = useJwt(localStorage.getItem("user"));
  console.log("decodedToken", decodedToken);
  
  const toggleModal = () => {
    reEvaluateToken(localStorage.getItem("user"));
    if (!isExpired) {
      setShowModal(!showModal);
    }else{
      setShowModal(false)
      window.alert("Token is expired, please login again, if don't have account signup")
    }
  };

  return (
    <>
      <Grid container>
        <CreateEventModal showModal={showModal} toggleModal={toggleModal} />
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
              <Grid item xs={8} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
              <Grid item xs={8} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
              <Grid item xs={8} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
              <Grid item xs={4} md={4}>
                <Card />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;

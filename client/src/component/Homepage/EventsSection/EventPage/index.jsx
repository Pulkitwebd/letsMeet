import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import loading from "../../../Assets/loading.gif";
import classes from "./Event.module.css";
import Attendies from "../../../Assets/userPhoto.jpg";
import { IoMdPin } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const getEvent = (eventId) => {
  return axios.get(`/api/feed/Event/${eventId}`);
};

const EventPage = () => {
  const [eventId, setEventId] = useState();
  const [queryKey, setQueryKey] = useState("get-event");

  const { isLoading, data, isError, error } = useQuery(
    [queryKey, eventId],
    () => getEvent(eventId)
  );

  //getiing usrePhto from card index.jsx by passing in navigate
  const location = useLocation();
  const userPhoto = location.state.userPhoto;

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

  return (
    <>
      {isLoading && (
        <div className={classes.loadingBox}>
          <img src={loading} alt="loading gif" />
        </div>
      )}
      {isError && <div>{error.message}</div>}
      {data && (
        <div>
          <div className={classes.eventHeading}>
            <h1>Title - {data.data.title}</h1>
            <div className={classes.organiserDetails}>
              <div className={classes.organiserPhoto}>
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
                  {requiredTimeFormat} {requiredDateFormat}
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

              <p className={classes.eventDetailsPara}>
                Presenting an engaging session on SC 200 - Security &
                Governance, an essential Microsoft Certification that is very
                much in demand. The role of a Microsoft Security Operations
                Analyst is a very critical one and plays a vital role in
                configuring and deploying these technologies. Synopsis: This
                session would enable Security Operations analysts to perform
                their key responsibilities like threat management, monitoring,
                and response by using a variety of security solutions across
                their environment. It would also help them perform their role
                which primarily investigate, responds to, and hunt for threats
                using Microsoft Azure Sentinel, Azure Defender, Microsoft 365
                Defender, and third-party security products. Since the security
                operations analyst consumes the operational output of these
                tools, they are also a critical stakeholder in the configuration
                and deployment of these technologies. Agenda: Microsoft security
                operations analyst collaborates with organizational stakeholders
                to secure information technology systems for the organization.
                Their goal is to reduce organizational risk by rapidly
                remediating active attacks in the environment, advising on
                improvements to threat protection practices, and referring
                violations of organizational policies to appropriate
                stakeholders. The core agenda would be covering key topics to
                help the operations analyst to achieve the same. To know more
                submit your entry here: https://forms.office.com/r/y3AmwEJvLi
                Note: Registration is mandatory to attend the session.
              </p>
            </div>

            <div className={classes.attendiesBox}>
              <h2>Attendies 4</h2>

              <Grid container spacing={3}>
                <Grid item md={4} xs={8}>
                  <div className={classes.attendiesCard}>
                    <div className={classes.attendiesImgBox}>
                      <img src={Attendies} alt="member" />
                    </div>
                    <p>Name</p>
                  </div>
                </Grid>
                <Grid item md={4} xs={4}>
                  <div className={classes.attendiesCard}>
                    <div className={classes.attendiesImgBox}>
                      <img src={Attendies} alt="member" />
                    </div>
                    <p>Name</p>
                  </div>
                </Grid>
                <Grid item md={4} xs={4}>
                  <div className={classes.attendiesCard}>
                    <div className={classes.attendiesImgBox}>
                      <img src={Attendies} alt="member" />
                    </div>
                    <p>Name</p>
                  </div>
                </Grid>
                <Grid item md={4} xs={8}>
                  <div className={classes.attendiesCard}>
                    <div className={classes.attendiesImgBox}>
                      <img src={Attendies} alt="member" />
                    </div>
                    <p>Name</p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventPage;

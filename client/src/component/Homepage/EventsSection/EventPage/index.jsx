import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import loading from "../../../Assets/loading.gif";
import classes from "./Event.module.css";

const getEvent = (eventId) => {
  return axios.get(`/api/feed/Event/${eventId}`);
};

const EventPage = () => {
  const [eventId, setEventId] = useState();
  const [queryKey, setQueryKey] = useState("get-event");
  const [offline, setOffline] = useState(true);

  const { isLoading, data, isError, error } = useQuery(
    [queryKey, eventId],
    () => getEvent(eventId)
  );

  useEffect(() => {
    const pathName = window.location.pathname;
    const eventId = pathName.split("/")[2];
    setEventId(eventId);
  }, []);

  const hadleOfflineOnline = () => setOffline(!offline);

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
    <div>
      {isLoading && (
        <div className={classes.loadingBox}>
          <img src={loading} alt="loading gif" />
        </div>
      )}
      {isError && <div>{error.message}</div>}
      {data ? (
        <div>
          <div className={classes.eventHeading}>
            <h1>{data.data.title}</h1>
            <div className={classes.organiserDetails}>
              <div className={classes.organiserPhoto}></div>
              <div className={classes.organiserHeading_Photo}>
                <h3>Organiser</h3>
                <p>{data.data.organiserName}</p>
              </div>
            </div>
          </div>

          <div className={classes.boxBtwHeading_Details}></div>

          <div className={classes.eventType}>
            <div
              onClick={hadleOfflineOnline}
              className={offline && classes.activeEventType}
            >
              Offline
            </div>
            <div
              onClick={hadleOfflineOnline}
              className={!offline && classes.activeEventType}
            >
              Online
            </div>
          </div>

          {offline && (
            <div className={classes.EventDetails}>
              <div>
                <p>{`${requiredDateFormat} ${requiredTimeFormat}`}</p>
              </div>
              <p>Offline</p>
            </div>
          )}

          {!offline && (
            <div className={classes.EventDetails}>
              <div>
                <p>{`${requiredDateFormat} ${requiredTimeFormat}`}</p>
              </div>
              <p>Online</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
      <div></div>
    </div>
  );
};

export default EventPage;

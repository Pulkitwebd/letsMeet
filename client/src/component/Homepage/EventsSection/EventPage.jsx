import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
  const [eventId, setEventId] = useState();
  const [eventDetails, setEventDetails] = useState();

  useEffect(() => {
    const pathName = window.location.pathname;
    const eventId = pathName.split("/")[2];
    setEventId(eventId);

    axios
      .get(`/api/feed/Event/${eventId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return <div>{eventId ? <div>Event Id : {eventId}</div> : ""}</div>;
};

export default EventPage;

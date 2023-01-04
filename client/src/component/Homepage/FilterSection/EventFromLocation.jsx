import React from "react";
import Slider from "@mui/material/Slider";
import classes from "../Homepage.module.css";


const EventFromLocation = () => {
  const [range, setRange] = React.useState([0, 5]);

  const handleRange = (event, newValue) => {
    setRange(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <div className={classes.eventFromLocation}>
      <h1>Event from your location</h1>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={range}
        onChange={handleRange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={50}
      />
    </div>
  );
};

export default EventFromLocation;

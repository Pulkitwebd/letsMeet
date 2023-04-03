import React, { useState } from "react";
import classes from "../Homepage.module.css";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const DateOfEvent = () => {
  const [value, setValue] = useState(Dayjs);

  return (
    <div className={classes.dateOfEvent}>
      <h1>Events On</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Choose Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateOfEvent;

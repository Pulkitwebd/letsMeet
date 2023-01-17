import React, { useState } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import classes from "./Modal.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Map1 from "./Map1";
const CreateEventModal = (props) => {
  const [value, setValue] = useState(dayjs("2022-04-07"));
  

  return (
    <Modal
      isOpen={props.showModal}
      // onAfterOpen={afterOpenModal}
      ariaHideApp={false}
      onRequestClose={props.showModal}
      className={classes.modal}
      contentLabel="Example Modal"
    >
      <button className={classes.modalCloseBtn} onClick={props.toggleModal}>
        Close
      </button>
      <h1 className={classes.headingCreateEvent}>Create Event</h1>

      <form className={classes.form}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Schedule Event Date and time"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
        <Map1 />
      </form>
    </Modal>
  );
};

export default CreateEventModal;

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import classes from "./Modal.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Map2 from "./LocationSearch";
const CreateEventModal = (props) => {
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [showModal, setShowModal] = useState(props.showModal);
  
  useEffect(() => {
    setShowModal(props.showModal)
  }, [props.showModal])
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={props.showModal}
      // onAfterOpen={afterOpenModal}
      ariaHideApp={false}
      onRequestClose={handleModalClose}
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
        <Map2 />
      </form>
    </Modal>
  );
};

export default CreateEventModal;

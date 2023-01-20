import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import classes from "./Modal.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import validation from "./EventFormValidation";
import CustomTextField from "../../Shared/TextField";
import Select from "react-select";
import indianStates from "./State";
import axios from "axios";

const CreateEventModal = (props) => {
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [showModal, setShowModal] = useState(props.showModal);
  const [userDetails, setUserDetails] = useState({});
  const [slectedState, setSelectedState] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [currentCity, setCurrentCity] = useState();

  const { user } = useSelector((state) => state.auth);

  const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  const API_key = `a12f56741f3e535e0f0ab6cf0fcd4ced`;

  useEffect(() => {
    setShowModal(props.showModal);
    //getting user detail from redux and store in userDetails for full name and email of user
    if (user) {
      setUserDetails({
        userFullName: `${user.user.firstname} ${user.user.lastname}`,
        userEmail: user.user.email,
      });
    }
    setSelectedState("");
  }, [props.showModal]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSelect = (selectedOption) => {
    setSelectedState(selectedOption.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });

    if (latitude !== 0 && longitude !== 0) {
      let final_endpoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`;
      axios.get(final_endpoint).then((res) => {
        setCurrentCity(res.data.name);
      });
    }
  }, [latitude, longitude]);

  console.log(currentCity);

  return (
    <Modal
      isOpen={props.showModal}
      ariaHideApp={false}
      onRequestClose={handleModalClose}
      className={classes.modal}
      contentLabel="Example Modal"
    >
      <button className={classes.modalCloseBtn} onClick={props.toggleModal}>
        Close
      </button>
      <h1 className={classes.headingCreateEvent}>Create Event</h1>
      <Formik
        initialValues={{
          organiser_user_id: user.user._id,
          landmark: "",
          city: "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          // setCurrentCity(values.city);
          // console.log("currentCity", currentCity);
          values.meetDate = value.$d;
          values.postingDate = new Date();
          if (slectedState) {
            values.state = slectedState;
            console.log("values", values);
          } else {
            console.log("please select state");
          }
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Schedule Event Date and time"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                name="Time"
              />
            </LocalizationProvider>

            <CustomTextField
              type="text"
              name="fullName"
              label="Full Name : "
              placeholder={`${userDetails.userFullName}`}
              isDisabled={true}
            />

            <CustomTextField
              type="email"
              name="email"
              label="Email : "
              placeholder={`${userDetails.userEmail}`}
              isDisabled={true}
            />

            <CustomTextField
              type="text"
              name="landmark"
              label="Land Mark : "
              placeholder="Land Mark"
            />

            <CustomTextField
              type="text"
              name="city"
              label="City : "
              placeholder={`${currentCity}`}
            />
           
            <Select
              classNamePrefix="select"
              // defaultValue={indianStates[0]}
              name="state"
              options={indianStates}
              onChange={handleSelect}
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateEventModal;

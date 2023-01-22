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
import axios from "axios";
import Select from "react-select";
import validation from "./EventFormValidation";
import CustomTextField from "../../Shared/TextField";
import indianStates from "./StateNames";
import cityNames from "./CityNames";


const CreateEventModal = (props) => {
  const [value, setValue] = useState(dayjs("2023-04-07"));
  const [showModal, setShowModal] = useState(props.showModal);
  const [userDetails, setUserDetails] = useState({});

  //getting data of user from redux
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setShowModal(props.showModal);
    //getting user detail from redux and store in userDetails for full name and email of user
    if (user) {
      setUserDetails({
        userFullName: `${user.user.firstname} ${user.user.lastname}`,
        userEmail: user.user.email,
      });
    }
  }, [props.showModal]);

  const handleModalClose = () => {
    setShowModal(false);
  };

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
          organiser_user_id: user ? user.user._id : "",
          landmark: "",
          houseNo: "",
          area: "",
          city: "",
          state: "",
          personNeeded: "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          values.meetDate = value.$d;
          values.postingDate = new Date();

          // values.address = {
          //   landmark: values.landmark,
          //   houseNo: values.houseNo,
          //   area: values.area,
          //   city: selectedValuesOfSelectCom.city,
          //   state: selectedValuesOfSelectCom.state,
          // };

          // values.personNeeded = selectedValuesOfSelectCom.personNeeded;

          console.log("values", values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <label>Schedule Event Date and time : </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label=""
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
              type="number"
              name="personNeeded"
              label="Person Needed : "
              placeholder=""
              // isDisabled={true}
            />

            <CustomTextField
              type="text"
              name="houseNo"
              label="Flat, House no, Building, Company, Apartment : "
              placeholder=""
            />

            <CustomTextField
              type="text"
              name="area"
              label="Area, Street, Sector, Village : "
              placeholder=""
            />

            <CustomTextField
              type="text"
              name="landmark"
              label="Land Mark : "
              placeholder=""
            />

            <div>
              <label>City : </label>
              <Select
                name="city"
                options={cityNames}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(city) => formik.setFieldValue("city", city.value)}
              />
              {formik.touched.city && formik.errors.city ? (
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              ) : null}
            </div>

            <div>
              <label>State : </label>
              <Select
                name="state"
                options={indianStates}
                onChange={(state) => formik.setFieldValue("state", state.value)}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {formik.touched.state && formik.errors.state ? (
                <div style={{ color: "red" }}>{formik.errors.state}</div>
              ) : null}
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateEventModal;

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
import Select from "react-select";
// import LoadingButton from '@mui/lab/LoadingButton';
import validation from "./EventFormValidation";
import CustomTextField from "../../Shared/TextField";
import indianStates from "./StateNames";
import cityNames from "./CityNames";
import category from "./Category";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { SendIcon } from "@mui/icons-material/Send.js";

const CreateEventModal = (props) => {
  const [value, setValue] = useState(dayjs("2023-04-07"));
  const [showModal, setShowModal] = useState(props.showModal);
  const [loading, setLoading] = useState(false);

  const [randomString, setRandomString] = useState(
    Math.random()
      .toString(36)
      .substring(2, 15) + Date.now()
  );

  //storign base64 content of eventImageUrl
  const [eventImageBase64, setEventImageBase64] = useState(null);

  // eventImageUrl is used here to show event image in modal
  const [eventImageUrl, setEventImageUrl] = useState(null);

  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

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

    setEventImageUrl(null);
  }, [props.showModal]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const currentTimeStamp = new Date();
  const formattedTimeStamp = `${currentTimeStamp.getFullYear()}-${(
    "0" +
    (currentTimeStamp.getMonth() + 1)
  ).slice(-2)}-${("0" + currentTimeStamp.getDate()).slice(-2)} ${(
    "0" + currentTimeStamp.getHours()
  ).slice(-2)}:${("0" + currentTimeStamp.getMinutes()).slice(-2)}:${(
    "0" + currentTimeStamp.getSeconds()
  ).slice(-2)}`;

  // console.log(eventImg);

  const handleEventImg = async (event) => {
    const selectedFile = event.target.files[0];

    const base64 = await convertToBase64(selectedFile);
    setEventImageBase64(base64);

    setEventImageUrl(URL.createObjectURL(selectedFile));
  };

  // console.log(eventImageUrl);

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
          organiserName: user ? userDetails.userFullName : "",
          landmark: "",
          houseNo: "",
          area: "",
          city: "",
          state: "",
          category: "",
          personNeeded: "",
          desc: "",
          eventImage: "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          console.log(eventImageBase64);

          let createEvent = {
            organiserName: values.organiserName,
            user_id: values.organiser_user_id,
            postingDate: formattedTimeStamp,
            meetDate: value.$d,
            address: {
              houseNoflatNo: values.houseNo,
              landmark: values.landmark,
              area: values.area,
              city: values.city,
              state: values.state,
            },
            personNeeded: values.personNeeded,
            category: values.category,
            desc: values.desc,
            eventImage: eventImageBase64,
          };

          setLoading(true);
          axios
            .post("/api/feed/feedPost", createEvent)
            .then((response) => {
              if (response.status == 201) {
                setLoading(false);
                setRandomString(Math.random().toString(36).substring(2, 15) + Date.now())
                props.toggleModal(response.status, response.data.event, randomString);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <label>Schedule Event Date and time : </label>
            <div style={{ marginTop: "5px" }}>
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
            </div>

            <CustomTextField
              type="text"
              name="fullName"
              label="Full Name : "
              placeholder={`${userDetails.userFullName}`}
              isDisabled={true}
              style={{ marginTop: "10px" }}
            />

            <CustomTextField
              type="email"
              name="email"
              label="Email : "
              placeholder={`${userDetails.userEmail}`}
              isDisabled={true}
            />

            <div className={classes.categorySelect}>
              <label>Category : </label>
              <Select
                name="category"
                options={category}
                classNamePrefix="select"
                onChange={(category) =>
                  formik.setFieldValue("category", category.value)
                }
              />
              {formik.touched.category && formik.errors.category ? (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
              ) : null}
            </div>

            <div>
              <input
                type="file"
                name="eventImage"
                placeholder="Choose Event Image"
                onChange={handleEventImg}
                accept=".jpeg, .png, .jpg"
              />
              <div>
                {eventImageUrl && (
                  <img
                    src={eventImageUrl}
                    className={classes.eventImg}
                    alt="Selected"
                  />
                )}
              </div>
            </div>

            <CustomTextField
              type="number"
              name="personNeeded"
              label="Person Needed : "
              placeholder=""
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

            <CustomTextField
              type="textarea"
              cols="5"
              rows="5"
              name="desc"
              label="Description : "
              placeholder=""
            />

            <div className={classes.categorySelect}>
              <label>City : </label>
              <Select
                name="city"
                options={cityNames}
                classNamePrefix="select"
                onChange={(city) => formik.setFieldValue("city", city.value)}
              />
              {formik.touched.city && formik.errors.city ? (
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              ) : null}
            </div>

            <div className={classes.categorySelect}>
              <label>State : </label>
              <Select
                name="state"
                options={indianStates}
                onChange={(state) => formik.setFieldValue("state", state.value)}
                classNamePrefix="select"
              />
              {formik.touched.state && formik.errors.state ? (
                <div style={{ color: "red" }}>{formik.errors.state}</div>
              ) : null}
            </div>

            {!loading ? (
              <button type="submit" className={classes.submitBtn}>
                Submit
              </button>
            ) : (
              <button className={classes.submitBtn}>loading</button>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateEventModal;

const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import axios from "axios";

import classes from "./Modal.module.css";
import MutliStepProgessBar from "./multiStepProgessBar/index.js";

import { StepOne, StepTwo, StepThree } from './formsAllSteps/index';

const CreateEventModal = (props) => {
  // step of mutlistepbar
  const [currentStep, setCurrentStep] = useState(1);

  const [eventData, setEventData] = useState({
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
  });

  const makeRequest = (eventData) => {
    let finalData = {
      organiserName: user ? userDetails.userFullName : "",
      user_id: user ? user.user._id : "",
      title: eventData.title,
      postingDate: formattedTimeStamp,
      meetDate: value,
      address: {
        houseNoflatNo: eventData.houseNo,
        landmark: eventData.landmark,
        area: eventData.area,
        city: eventData.city,
        state: eventData.state,
      },
      personNeeded: eventData.personNeeded,
      category: eventData.category,
      desc: eventData.desc,
      eventImage: eventImageBase64,
    };

    axios
      .post("/api/feed/feedPost", finalData)
      .then((response) => {
        if (response.status == 201) {
          setLoading(false);
          setRandomString(
            Math.random()
              .toString(36)
              .substring(2, 15) + Date.now()
          );
          props.toggleModal(response.status, response.data.event, randomString);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("form submitted", eventData);
  };

  const handlePrevStep = (newData) => {
    setCurrentStep((prevStep) => prevStep - 1);
    setEventData((prev) => ({ ...prev, newData }));
  };

  const handleNextStep = (newData, final = false) => {
    setEventData((prev) => ({ ...prev, ...newData }));

    if (final) {
      console.log("hello");
      makeRequest(newData);
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

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

  const handleEventImg = async (event) => {
    const selectedFile = event.target.files[0];

    const base64 = await convertToBase64(selectedFile);
    setEventImageBase64(base64);

    setEventImageUrl(URL.createObjectURL(selectedFile));
  };

  const steps = [
    <StepOne
      userDetails={userDetails}
      next={handleNextStep}
      eventData={eventData}
      value={value}
      setValue={setValue}
      formattedTimeStamp={formattedTimeStamp}
    />,
    <StepTwo
      prev={handlePrevStep}
      next={handleNextStep}
      eventData={eventData}
    />,
    <StepThree
      handleEventImg={handleEventImg}
      prev={handlePrevStep}
      next={handleNextStep}
      eventData={eventData}
      eventImageUrl={eventImageUrl}
    />,
  ];

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
      <MutliStepProgessBar step={currentStep} />

      <div className={classes.steps}>{steps[currentStep - 1]}</div>
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


{
  /* <Formik
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
          let createEvent = {
            organiserName: values.organiserName,
            user_id: values.organiser_user_id,
            title: values.title,
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
                setRandomString(
                  Math.random()
                    .toString(36)
                    .substring(2, 15) + Date.now()
                );
                props.toggleModal(
                  response.status,
                  response.data.event,
                  randomString
                );
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

            <CustomTextField
              type="text"
              name="title"
              label="Title : "
              placeholder=""
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
      </Formik> */
}

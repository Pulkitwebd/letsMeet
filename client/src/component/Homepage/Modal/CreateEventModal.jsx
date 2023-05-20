import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import axios from "axios";

import classes from "./Modal.module.css";
import MutliStepProgessBar from "./multiStepProgessBar/index.js";

import { StepOne, StepTwo, StepThree } from "./formsAllSteps/index";

const CreateEventModal = (props) => {
  // step of mutlistepbar
  const [currentStep, setCurrentStep] = useState(1);

  //getting data of user from redux
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({});

  const emptyEventData = {
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
  };

  const [eventData, setEventData] = useState(emptyEventData);

  const makeRequest = async (eventData) => {
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

    try {
      const response = await axios.post("https://letsmeet.onrender.com/api/feed/feedPost", finalData);

      if (response.status === 201) {
        setRandomString(
          Math.random()
            .toString(36)
            .substring(2, 15) + Date.now()
        );
        props.toggleModal(response.status, response.data.message);
      }
    } catch (error) {
      if (error.response.status === 429) {
        props.toggleModal(error.response.status, error.response.data.message);
      }
    }
  };

  const handlePrevStep = (newData) => {
    setCurrentStep((prevStep) => prevStep - 1);
    setEventData((prev) => ({ ...prev, newData }));
  };

  const handleNextStep = (newData, final = false) => {
    setEventData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const [value, setValue] = useState(dayjs("2023-04-07"));
  const [, setShowModal] = useState(props.showModal);
  // const [loading, setLoading] = useState(false);

  const [, setRandomString] = useState(
    Math.random()
      .toString(36)
      .substring(2, 15) + Date.now()
  );

  //storign base64 content of eventImageUrl
  const [eventImageBase64, setEventImageBase64] = useState(null);

  // eventImageUrl is used here to show event image in modal
  const [eventImageUrl, setEventImageUrl] = useState(null);

  useEffect(() => {
    setShowModal(props.showModal);
    // when modal open formstep will be 1 and eventData key --- values will be empty
    setEventData(emptyEventData);
    setCurrentStep(1);
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

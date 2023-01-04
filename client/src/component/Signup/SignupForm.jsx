import React, { useState } from "react";
import TextField from "../Shared/TextField";
import { Formik, Form } from "formik";
import classes from "./Signup.module.css";
import { validateStep1, validateStep2 } from "./Validation";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SignupForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    // axios POST request
    Axios.post("http://localhost:3001/api/auth/register", formData)
      .then(function (res) {
        if (res.status == 201) {
          const response = JSON.parse(res.request.response);
          const decoded = jwt_decode(response.token);
          localStorage.setItem("token", response.token);
          console.log(decoded, response.user);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return <>{steps[currentStep]}</>;
};

const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Formik
      initialValues={props.data}
      validationSchema={validateStep1}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <TextField type="text" name="firstname" placeholder="First Name" />
          <TextField type="text" name="lastname" placeholder="Last Name" />
          <TextField type="email" name="email" placeholder="Email" />
          <TextField type="password" name="password" placeholder="Password" />
          <TextField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />

          <button className={classes.nextButton} type="submit">
            Next Step
          </button>
        </Form>
      )}
    </Formik>
  );
};

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  return (
    <Formik
      initialValues={props.data}
      validationSchema={validateStep2}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <TextField placeholder="Mobile Number" name="phone" type="tel" />
          <TextField type="number" name="age" placeholder="Age" />
          <button
            className={classes.backButton}
            onClick={() => props.prev(formik.values)}
          >
            Back
          </button>
          <button className={classes.nextButton} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

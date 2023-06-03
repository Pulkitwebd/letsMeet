import React, { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import classes from "./Signup.module.css";
import { validateStep1, validateStep2 } from "./Validation";
import { register, reset } from "../../Redux/Auth/authSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
  });

  useEffect(() => {
    if (isError) {
      console.log("isError", isError);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const makeRequest = (formData) => {
    dispatch(register(formData));
  };

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      // setFormData(newData);
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

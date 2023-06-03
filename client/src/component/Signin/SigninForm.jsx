import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";

import { login, reset } from "../../Redux/Auth/authSlice";
import TextField from "../Shared/TextField";
import classes from "./Signin.module.css";
import { validation } from "./validation";

const SigninForm = ({ showPassPage }) => {
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [invalidCredential, setInvalidCredential] = useState(false);

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const showForgotPasswordComp = () => {
    showPassPage(true);
  };

  useEffect(() => {
    if (isError) {
      setInvalidCredential(true);
    }

    if (isSuccess || user) {
      setShowToast(false)
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  return (
    <>
      {showToast && <ToastContainer />}
      <h1 className={classes.loginName}>Log in</h1>
      {invalidCredential ? (
        <p className={classes.invalidCred}>
          Invalid credential! Please try again
        </p>
      ) : (
        <p></p>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={(values) => {
          setShowToast(true);
          toast.success("Please Wait", {
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            autoClose: 1000,
          });
          dispatch(login(values));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} className={classes.mainForm}>
            <TextField type="email" name="email" placeholder="Email" />
            <TextField type="password" name="password" placeholder="Password" />
            <div className={classes.forgotPassword}>
              <span onClick={showForgotPasswordComp}>Forgot Password?</span>
            </div>

            <button className={classes.loginBtn} type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { SigninForm };

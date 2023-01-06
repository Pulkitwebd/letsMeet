import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../Shared/TextField";
import classes from "./Signin.module.css";
import { Formik, Form } from "formik";
import { validation } from "./validation";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../Redux/Auth/authSlice";

const SigninForm = ({ showPassPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [invalidCredential, setInvalidCredential] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const showForgotPasswordComp = () => {
    showPassPage(true);
  };

  useEffect(() => {
    if (isError) {
      console.log("isError", isError);
      setInvalidCredential(true)
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  return (
    <>
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

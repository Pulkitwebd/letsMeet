import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../Shared/TextField";
import classes from "./Signin.module.css";
import { Formik, Form } from "formik";
import { validation } from "./validation";
import Axios from "axios";

const SigninForm = ({ showPassPage }) => {
  const [invalidCredential, setInvalidCredential] = useState(false);
  const navigate = useNavigate();

  const showForgotPasswordComp = () => {
    showPassPage(true);
  };

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
          Axios.post("http://localhost:3001/api/auth/login", {
            email: values.email,
            password: values.password,
          })
            .then(function (res) {
              console.log(res)
              if ((res.status = 200)) {
                localStorage.setItem("token", res.data.token);
                navigate("/");
              }
            })
            .catch(function (error) {
              if (error) {
                setInvalidCredential(true);
              }
            });
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
